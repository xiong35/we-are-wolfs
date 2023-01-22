/**
 * 游戏角色相关的定义
 */

import { Day, Index } from "./game";

/**
 * 女巫的药剂类型
 * 灵药 | 毒药
 */
export type Potion = "POISON" | "MEDICINE";
/** 药的使用情况 */
type PotionStatus = {
  usedDay: Day;
  usedAt: Index;
};
/** 女巫两种药的使用情况（null则为未使用） */
export type IWitchStatus = Record<Potion, PotionStatus | null>;

export type IHunterStatus = {
  /** 记录开枪的信息 */
  shootAt: {
    day: Day;
    player: Index;
  };
};

export type IGuardStatus = {
  /** 记录每晚保护了谁 */
  protects: Index[];
};

export type ISeerStatus = {
  /** 记录每晚查验的人和结果 */
  checks: {
    index: Index;
    isWerewolf: boolean;
  }[];
};

export type IWerewolfStatus = {
  /** 记录每晚想杀的人 */
  wantToKills: Index[];
};

export type ICharacterStatus =
  | IHunterStatus
  | IGuardStatus
  | ISeerStatus
  | IWerewolfStatus
  | IWitchStatus;
