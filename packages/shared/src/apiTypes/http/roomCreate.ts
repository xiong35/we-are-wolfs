import { ECharacter, ID } from "../../gameTypes";

/**
 * 创建房间的请求体
 */
export type ICreateRoomReq = {
  /** 设置这局游戏该有的角色 */
  characters: ECharacter[];
  /** 可选的房间密码 */
  password?: string;
  /** 创建者的昵称 */
  creatorName: string;
};

/** 创建房间的返回数据 */
export type ICreateRoomResp = {
  /** 后端分配的房间号 */
  roomNumber: string;
  /** 后端为 creator 分配的 id */
  id: ID;
};
