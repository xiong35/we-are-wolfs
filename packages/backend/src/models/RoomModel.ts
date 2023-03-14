import {
  ECharacter,
  EGameStatus,
  ICreateRoomReq,
  ID,
  Index,
  IPlayer,
  IPublicPlayer,
  IRoom,
  None,
} from "@werewolf/shared";
import { WError } from "../utils/error";
import { Player } from "./PlayerModel";

export class Room implements IRoom {
  roomNumber: string;
  creatorID: string;
  password?: string;
  needingCharacters: ECharacter[];
  remainingIndexes: Index[];
  currentDay: number = None; // 狼人杀人时会 ++
  isFinished = false;
  gameStatus: EGameStatus[] = ["WOLF_KILL"];
  toFinishPlayers: Set<number> = new Set<Index>();
  timer: NodeJS.Timeout;
  players: Player[];
  private playersMap: Record<ID, Player> = {};

  get curStatus(): EGameStatus {
    return this.gameStatus[this.gameStatus.length - 1];
  }
  /** 销毁房间本身的计时器 */
  clearSelfTimer: NodeJS.Timeout;
  /** 死亡结算后的下一个状态 */
  nextStateOfDieCheck: EGameStatus;
  /** 当前正在进行死亡结算的玩家序号 */
  curDyingPlayer: Player;

  createdAt = new Date();

  private static roomMap: Record<string, Room> = {};

  constructor({
    creator,
    characters,
    password,
  }: ICreateRoomReq & { creator: Player }) {
    if (!checkNeedingCharacters(characters)) {
      // throw new WError(400, "人数配比不合法");
    }

    let tryTime = 20;
    while (tryTime--) {
      const roomNumber = Math.random().toString().slice(2, 8);
      const prevRoom = Room.roomMap[roomNumber];
      if (
        prevRoom &&
        Date.now() - prevRoom.createdAt.getTime() < 1000 * 3600 * 24
      ) {
        continue;
      } else {
        this.roomNumber = roomNumber;
        Room.roomMap[this.roomNumber] = this;
        break;
      }
    }
    if (tryTime <= 0) {
      throw new WError(500, "创建错误, 请重试!");
    }

    this.creatorID = creator.id;
    this.players = [creator];
    this.needingCharacters = characters; // default index=1
    this.remainingIndexes = new Array(characters.length - 1)
      .fill(0)
      .map((_, i) => i + 2);
    this.password = password;

    this.clearSelfTimer = setTimeout(
      () => Room.clearRoom(this.roomNumber),
      3600 * 1000 * 12
    ); // 12h 后清除此房间
  }

  playerJoin(name: string, password?: string): Player {
    const nameReg = /^.{1,15}$/;
    if (!nameReg.test(name)) {
      throw new WError(400, "昵称不合法");
    }
    if (this.password && this.password !== password) {
      throw new WError(400, "密码错误");
    }
    if (this.remainingIndexes.length === 0) {
      throw new WError(400, "房间已满");
    }

    const index = this.remainingIndexes.shift(); // assign smallest index
    const player = new Player(name, index);

    this.addPlayer(player);

    return player;
  }

  private addPlayer(player: Player) {
    this.players[player.index] = player;
    this.playersMap[player.id] = player;
  }

  choosePublicInfo(): IPublicPlayer[] {
    return this.players
      .map((p) => p.getPublic(this))
      .sort((a, b) => a.index - b.index);
  }

  getPlayerById(id: ID): Player {
    const player = this.playersMap[id];
    if (!player) throw new WError(400, "id 错误");
    return player;
  }

  getPlayerByIndex(index: Index): Player {
    const player = this.players[index];
    if (!player) throw new WError(400, "编号错误");
    return player;
  }

  static getRoom(number: string): Room {
    const room = Room.roomMap[number];
    if (!room) throw new WError(4000, "未找到房间号");
    return room;
  }

  static clearRoom(number: string): void {
    delete this.roomMap[number];
  }
}

function checkNeedingCharacters(needingCharacters: ECharacter[]): boolean {
  if (!needingCharacters.length) return false;
  const charMap = needingCharacters.reduce((map, character) => {
    map[character] = map[character] || 0;
    map[character]++;
    return map;
  }, {} as Partial<Record<ECharacter, number>>);

  if (!charMap.WEREWOLF) return false;

  if (charMap.WEREWOLF > needingCharacters.length / 2) return false;

  return true;
}
