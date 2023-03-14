import { ECharacter, ID, Index } from "../../gameTypes";

export type IJoinRoomReq = {
  /** 加入时设置昵称 */
  name: string;
  /** 如果房间有密码，需要输入哈希后的密码 */
  password?: string;
  /** 要加入的房间号 */
  roomNumber: string; // 六位房间号
};

export type IJoinRoomResp = {
  /** 后端分配到的 id */
  id: ID;
  index: Index;
  /** 后端分配的角色 */
  needingCharacters: ECharacter[];
};
