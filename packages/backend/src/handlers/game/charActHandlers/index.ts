import {
  EGameStatus,
  IChangeStatusMsg,
  IHttpResp,
  Index,
  TIMEOUT,
  WSEvents,
} from "@werewolf/shared";
import { Context } from "koa";
import { type } from "os";

import io from "../../..";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";

import { BeforeDayDiscussHandler } from "./BeforeDayDiscuss";
import { DayDiscussHandler } from "./DayDiscuss";
import { ExileVoteHandler } from "./ExileVote";
import { ExileVoteCheckHandler } from "./ExileVoteCheck";
import { GuardProtectHandler } from "./GuardProtect";
import { HunterCheckHandler } from "./HunterCheck";
import { HunterShootHandler } from "./HunterShoot";
import { LeaveMsgHandler } from "./LeaveMsg";
import { SeerCheckHandler } from "./SeerCheck";
import { SheriffAssignHandler } from "./SheriffAssign";
import { SheriffAssignCheckHandler } from "./SheriffAssignCheck";
import { SheriffElectHandler } from "./SheriffElect";
import { SheriffSpeechHandler } from "./SheriffSpeech";
import { SheriffVoteHandler } from "./SheriffVote";
import { SheriffVoteCheckHandler } from "./SheriffVoteCheck";
import { WitchActHandler } from "./WitchAct";
import { WolfKillHandler } from "./WolfKill";
import { WolfKillCheckHandler } from "./WolfKillCheck";

export type StateStartResp = {
  /**
   * 在 start of state 中判断接下来该怎么操作：
   * - START: 开始当前状态
   * - SKIP: 整个跳过当前状态（尝试 start gotoNextState）
   * - END: 直接进入 endOfState 的调用
   */
  action: "START" | "END";
  argsToEndOfState?: any[];
};

export type StateEndResp = {
  /**
   * 在 start of state 中判断接下来该怎么操作：
   * - START: 开始当前状态
   * - SKIP: 整个跳过当前状态（尝试 start gotoNextState）
   * - END: 进入 endOfState 的调用
   */
  nextState: EGameStatus;
  argsToNextStartOfState?: any[];
};

export interface GameActHandler {
  /**
   * 在状态中处理玩家发送到 http 请求(在此状态下进行的操作)
   * 在 koa 中被调用, 是在某个状态中处理玩家操作的函数\
   * 仅记录操作并返回操作结果, 多人操作则统一返回 ok
   */
  handleHttpInTheState: (
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) => IHttpResp;
  /**
   * 检查是否需要唤起 state
   * 链式调用\
   * 在上一个定时器到点时调用下一个状态的结束函数
   * 1. 对于结果
   *    - 单人操作: 直接返回操作结果
   *    - 多人操作: 用 socket 通知所有玩家主动拉取操作结果, 只给身份合法的人返回结果, 其他人不做处理
   * 2. 对于下一状态
   *    - 下一状态入栈
   *    - 改变天数?
   *    - 改变玩家状态
   *    - 开启下一状态的定时器
   */
  /**
   * 在某个状态开始时调用
   * 1. 设置此状态结束的回调
   * 2. 通知玩家当前状态已经发生改变
   * 3. 通知设置天数
   */
  startOfState: (room: Room, ...args: any) => StateStartResp;

  /**
   * 在某个状态结束时调用
   * 1. 向玩家发送此状态的结果
   * 2. 根据局势判断要转移到什么状态
   * 3. 调用下一状态的 start
   */
  endOfState: (room: Room, ...rest: any) => StateEndResp;

  readonly curStatus: EGameStatus;
}

export const status2Handler: Record<EGameStatus, GameActHandler> = {
  DAY_DISCUSS: DayDiscussHandler,
  LEAVE_MSG: LeaveMsgHandler,
  HUNTER_CHECK: HunterCheckHandler,
  EXILE_VOTE: ExileVoteHandler,
  GUARD_PROTECT: GuardProtectHandler,
  HUNTER_SHOOT: HunterShootHandler,
  SEER_CHECK: SeerCheckHandler,
  SHERIFF_ASSIGN: SheriffAssignHandler,
  SHERIFF_ELECT: SheriffElectHandler,
  SHERIFF_SPEECH: SheriffSpeechHandler,
  SHERIFF_VOTE: SheriffVoteHandler,
  WITCH_ACT: WitchActHandler,
  WOLF_KILL: WolfKillHandler,
  EXILE_VOTE_CHECK: ExileVoteCheckHandler,
  WOLF_KILL_CHECK: WolfKillCheckHandler,
  SHERIFF_VOTE_CHECK: SheriffVoteCheckHandler,
  BEFORE_DAY_DISCUSS: BeforeDayDiscussHandler,
  SHERIFF_ASSIGN_CHECK: SheriffAssignCheckHandler,
};

export class GameController {
  timer: NodeJS.Timeout;
  constructor(private room: Room) {}

  // tryBeginState(statusToBegin: EGameStatus, ...args: any[]) {}

  /** 唤起给定节点的 startOfState */
  tryBeginState(statusToBegin: EGameStatus, ...argsToStartOfState: any[]) {
    const handler = status2Handler[statusToBegin];
    const { action, argsToEndOfState } = handler.startOfState(
      this.room,
      ...argsToStartOfState
    );

    console.log("# tryBeginState", {
      statusToBegin,
      argsToStartOfState,
      action,
      argsToEndOfState,
    });

    switch (action) {
      case "START":
        this.doBeginState(statusToBegin, ...argsToEndOfState);
        break;
      case "END":
        this.tryEndState(statusToBegin, ...argsToEndOfState);
        break;

      default:
        break;
    }
  }

  /** 真正进入当前状态 */
  private doBeginState(statusToBegin: EGameStatus, ...argsToEndOfState: any[]) {
    const { room } = this;
    const handler = status2Handler[statusToBegin];
    // 更新当前房间状态
    if (room.curStatus !== statusToBegin) {
      room.gameStatus.push(statusToBegin);
    }

    console.log("# doBeginState", {
      statusToBegin,
      argsToEndOfState,
      roomState: room.gameStatus,
    });

    const timeout = TIMEOUT[statusToBegin];
    // 设置此状态结束的回调
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.tryEndState(statusToBegin, ...argsToEndOfState);
    }, timeout * 1000);
    // 通知玩家当前状态已经发生改变, 并通知设置天数
    io.to(room.roomNumber).emit(WSEvents.CHANGE_STATUS, {
      day: room.currentDay,
      status: statusToBegin,
      timeout,
    } as IChangeStatusMsg);
  }

  tryEndState(statusToEnd: EGameStatus, ...argsToEndOfState: any[]) {
    const handler = status2Handler[statusToEnd];
    const { argsToNextStartOfState, nextState } = handler.endOfState(
      this.room,
      ...argsToEndOfState
    );

    console.log("# tryEndState", {
      statusToEnd,
      argsToEndOfState,
      nextState,
      argsToNextStartOfState,
    });

    this.tryBeginState(nextState, ...argsToNextStartOfState);
  }
}

/**
 * 当前死亡结算正式结束, 设置此人 isDying 为 false\
 * 判断是否还有要进行死亡检查的人
 * 1. 如果有就把他设置为 curDyingPlayer, 进行 LeaveMsg
 * 2. 如果没有, 设置 curDyingPlayer 为 null, 进行 nextState, 并将他设为 null
 */
// export function gotoNextStateAfterHandleDie(room: Room) {
//   if (checkGameOver(room)) return;

//   room.curDyingPlayer.isDying = false;
//   room.curDyingPlayer.isAlive = false;

//   const dyingPlayer = room.players.find((p) => p.isDying);
//   // console.log("# index", room.players);
//   // console.log("# index", { dyingPlayer });

//   if (dyingPlayer) {
//     room.curDyingPlayer = dyingPlayer;
//     return LeaveMsgHandler.startOfState(room);
//   } else {
//     room.curDyingPlayer = null;
//     // 单独处理, 从夜晚进入死亡结算再进入白天时
//     // 将未结束发言的人设为所有活着的人
//     // 同时设置能被投票的人为活着的
//     if (room.nextStateOfDieCheck === "DAY_DISCUSS") {
//       room.toFinishPlayers = new Set(
//         room.players.filter((p) => p.isAlive).map((p) => p.index)
//       );
//       room.players.forEach((p) => (p.canBeVoted = p.isAlive));
//     }
//     status2Handler[room.nextStateOfDieCheck].startOfState(room);
//     room.nextStateOfDieCheck = null;
//   }
// }
