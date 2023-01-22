import { Index } from "../../gameTypes";

/**
 * 玩家发动角色能力\
 * 执行操作的目标玩家编号\
 * 若为 女巫, 则正编号代表救人, 负编号代表杀人
 */
export type ICharacterActReq = {
  target: Index;
};

/**
 * 发动技能后的返回值，
 * 多半为空值，只有以下情况会有返回值：
 * - 女巫验人，得到 isWolf 字段
 */
export type ICharacterActResp = {
  isWolf?: boolean;
};
