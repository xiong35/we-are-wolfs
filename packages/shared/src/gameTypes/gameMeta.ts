/**
 * 游戏规则相关的定义
 */

import { IS_DEV } from "../..";
import { ID } from "./game";

/**
 * 可以调配数量的角色
 */
export type ESetableCharacters =
  | "HUNTER"
  | "WITCH"
  | "SEER"
  | "GUARD"
  | "VILLAGER"
  | "WEREWOLF";

/**
 * 所有游戏角色
 */

export type ECharacter =
  | ESetableCharacters
  | "SHERIFF"
  // TODO 需要这个 "" 吗
  | "";

/** 可以允许玩家进行操作的游戏阶段 */
export type EGameStatusWithAction =
  | "WOLF_KILL"
  | "SEER_CHECK"
  | "WITCH_ACT"
  | "GUARD_PROTECT"
  | "SHERIFF_ELECT"
  | "SHERIFF_VOTE"
  | "SHERIFF_ASSIGN"
  | "SHERIFF_SPEECH"
  | "DAY_DISCUSS"
  | "EXILE_VOTE"
  | "HUNTER_SHOOT"
  | "LEAVE_MSG";

/** 枚举游戏的各个可能的阶段 */
export type EGameStatus =
  | EGameStatusWithAction
  // | "WOLF_KILL" //  狼人杀人
  // | "SEER_CHECK" //  预言家验人
  // | "WITCH_ACT" //  女巫用药
  // | "GUARD_PROTECT" //  守卫保人
  // | "SHERIFF_ELECT" //  上警
  // | "SHERIFF_VOTE" //  投票选警长
  // | "SHERIFF_SPEECH" //  警长竞选发言
  // | "SHERIFF_ASSIGN" //  指派警长
  // | "DAY_DISCUSS" //  自由发言
  // | "EXILE_VOTE" //  票选狼人
  // | "HUNTER_SHOOT" //  "若你是猎人,请选择是否开枪
  // | "LEAVE_MSG"; //  留遗言
  | "WOLF_KILL_CHECK" //  狼人查看投票结果
  | "SHERIFF_VOTE_CHECK" //  查看警长投票结果
  | "SHERIFF_ASSIGN_CHECK" //  检查指派警长的结果
  | "BEFORE_DAY_DISCUSS" //  夜晚结算
  | "EXILE_VOTE_CHECK" //  票选狼人结果
  | "HUNTER_CHECK" //  查看猎人开枪结果
  | "GAME_OVER";

/** 预设的每个阶段的时间限制(s) */
export const TIMEOUT: Record<EGameStatus, number> = IS_DEV
  ? {
      WOLF_KILL: 250,
      WOLF_KILL_CHECK: 5,
      SEER_CHECK: 20,
      WITCH_ACT: 25,
      GUARD_PROTECT: 20,
      HUNTER_CHECK: 5,
      SHERIFF_ELECT: 15,
      SHERIFF_VOTE: 25,
      SHERIFF_VOTE_CHECK: 5,
      SHERIFF_ASSIGN: 20,
      DAY_DISCUSS: 996,
      EXILE_VOTE: 20,
      EXILE_VOTE_CHECK: 5,
      HUNTER_SHOOT: 20,
      LEAVE_MSG: 996,
      BEFORE_DAY_DISCUSS: 5,
      SHERIFF_SPEECH: 996,
      SHERIFF_ASSIGN_CHECK: 5,
      GAME_OVER: 996,
    }
  : {
      WOLF_KILL: 25,
      WOLF_KILL_CHECK: 5,
      SEER_CHECK: 20,
      WITCH_ACT: 25,
      GUARD_PROTECT: 20,
      HUNTER_CHECK: 5,
      SHERIFF_ELECT: 15,
      SHERIFF_VOTE: 25,
      SHERIFF_VOTE_CHECK: 5,
      SHERIFF_ASSIGN: 20,
      DAY_DISCUSS: 996,
      EXILE_VOTE: 20,
      EXILE_VOTE_CHECK: 5,
      HUNTER_SHOOT: 20,
      LEAVE_MSG: 996,
      BEFORE_DAY_DISCUSS: 5,
      SHERIFF_SPEECH: 996,
      SHERIFF_ASSIGN_CHECK: 5,
      GAME_OVER: 996,
    };

export type IToken = {
  /** player id */
  id: ID;
  /** token 创建的时间 */
  datetime: number;
  /** 玩家对应的房间号 */
  roomNumber: string;
};
