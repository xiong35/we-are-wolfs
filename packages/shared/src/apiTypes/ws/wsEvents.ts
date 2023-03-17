import { IChangeStatusMsg } from "./changeStatus";
import { IGameEndMsg } from "./gameEnd";
import { IRoomJoinMsg } from "./roomJoin";
import { IShowMsgMsg } from "./showMsg";

/** 后端向前端发送的 socket 信息 */
export type MapWSEvent2Payload = {
  //// 房间相关 ////
  /** 有人加入房间 */
  [WSEvents.ROOM_JOIN]: IRoomJoinMsg;
  /** 开始游戏 */
  [WSEvents.GAME_BEGIN]: null;

  //// 游戏相关 ////
  /** 设置游戏当前状态 */
  [WSEvents.CHANGE_STATUS]: IChangeStatusMsg;
  /** 后端推送给前端的消息 */
  [WSEvents.SHOW_MSG]: IShowMsgMsg;
  /** 结束游戏 */
  [WSEvents.GAME_END]: IGameEndMsg;
  [WSEvents.FE_JOIN_ROOM]: string;
};

export enum WSEvents {
  ROOM_JOIN = "ROOM_JOIN",
  GAME_BEGIN = "GAME_BEGIN",
  CHANGE_STATUS = "CHANGE_STATUS",
  SHOW_MSG = "SHOW_MSG",
  GAME_END = "GAME_END",
  FE_JOIN_ROOM = "FE_JOIN_ROOM",
}
