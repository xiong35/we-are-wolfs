import { Day, EGameStatus } from "../../gameTypes";

/** 后端设置当前游戏状态 */
export type IChangeStatusMsg = {
  /** 设置当前天数 */
  day: Day;
  /** 设置当前游戏状态 */
  status: EGameStatus;
  /** 当前阶段有多少秒倒计时 */
  timeout: number;
};
