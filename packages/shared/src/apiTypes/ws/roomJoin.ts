import { IPublicPlayer } from "../../gameTypes";

/** 房间中新加入一个玩家时所有人收到的信息，用于直接更新 players 列表 */
export type IRoomJoinMsg = {
  players: IPublicPlayer[];
};
