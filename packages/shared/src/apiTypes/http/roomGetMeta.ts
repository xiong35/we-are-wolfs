/**
 * 通知后端创建等待室
 */

import { ECharacter, IPublicPlayer } from "../../gameTypes";

/** 不需要请求体 */
export type IGetRoomMetaReq = null;

export type IGetRoomMetaResp = {
  /**
   * 已加入房间的玩家
   */
  players: IPublicPlayer[];
  /** 总共需要哪些角色 */
  needingCharacters: ECharacter[];
};
