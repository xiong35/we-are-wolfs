import { signal } from "@preact/signals-react";
import { getMockPlayers } from "@werewolf/mock";
import {
  Day,
  ECharacter,
  EGameStatus,
  IPlayer,
  IPublicPlayer,
  None,
  TIMEOUT,
} from "@werewolf/shared";

const defaultPlayer: IPlayer = {
  _id: "",
  character: "",
  exileVotes: [],
  index: 1,
  isAlive: false,
  isSheriff: false,
  name: "---",
  sheriffAssigns: [],
  canBeVoted: false,
  isDying: false,
  die: null,
};

/** 所有玩家的公开信息 */
export const players = signal<IPublicPlayer[]>(getMockPlayers(9));
/** 角色配置 */
export const needingCharacters = signal<ECharacter[]>([]);
/** 自己的详细状态 */
export const self = signal<IPlayer>(defaultPlayer);

/** 天数 */
export const date = signal<Day>(None);
/** 当前游戏进程 */
export const gameStatus = signal<EGameStatus>("WOLF_KILL");
/** 当前状态还有多结束 */
export const gameStatusTimeLeft = signal(TIMEOUT["WOLF_KILL"]);

/**
 * 获得最新的游戏信息
 * # TODO
 */
export async function refresh() {
  // const data = await getGameStatus({});
  // if (!data) return;
  // date.value = data.curDay;
  // gameStatus.value = data.gameStatus;
  // players.value = data.players;
  // self.value = data.self;
}

/** 重置所有游戏状态 */
export function resetStatus() {
  players.value = [];
  needingCharacters.value = [];
  self.value = defaultPlayer;

  date.value = None;
  gameStatus.value = "WOLF_KILL";
  gameStatusTimeLeft.value = TIMEOUT["WOLF_KILL"];
}
