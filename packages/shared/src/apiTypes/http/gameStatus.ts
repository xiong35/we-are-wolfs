import { Day, EGameStatus, IPlayer, IPublicPlayer } from "../../gameTypes";

/** 无需请求体 */
export type IGameStatusReq = null;

/**
 * 请求当前游戏状态简报，后端的返回内容
 */
export type IGameStatusResp = {
  /** 场上公开的玩家信息 */
  players: IPublicPlayer[];
  /** 个人完整的信息 */
  self: IPlayer;
  /** 当前游戏时间 */
  curDay: Day;
  /** 当前游戏状态 */
  gameStatus: EGameStatus;
};
