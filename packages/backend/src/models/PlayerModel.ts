import {
  ECharacter,
  ICharacterStatus,
  IDieInfo,
  IPlayer,
  IPublicPlayer,
} from "@werewolf/shared";
import { Room } from "./RoomModel";
import { nanoid } from "nanoid";
import { WError } from "../utils/error";

export class Player implements IPlayer {
  id: string;
  isAlive = true;
  isSheriff = false;
  exileVotes: number[] = [];
  sheriffAssigns: number[] = [];
  sheriffElectVote?: number;
  die: IDieInfo = null;
  isDying: boolean = false;
  canBeVoted: boolean = false;

  // is set when game begins
  character: ECharacter;
  characterStatus?: ICharacterStatus;

  constructor(public name: string, public index: number) {
    if (!name) throw new WError(400, "未提供玩家昵称");
    if (!index) throw new WError(400, "未提供玩家序号");
    this.id = nanoid();
  }

  /**
   * 将 Player 信息转换成公开的信息
   * @returns 可公开的信息
   */
  getPublic(room: Room): IPublicPlayer {
    return {
      index: this.index,
      isAlive: this.isAlive,
      isSheriff: this.isSheriff,
      name: this.name,
      isDying: this === room.curDyingPlayer,
      canBeVoted: this.canBeVoted,
      exileVotes: this.exileVotes,
      sheriffAssigns: this.sheriffAssigns,
      sheriffElectVote: this.sheriffElectVote,
    };
  }
}
