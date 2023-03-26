import { Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { GameActHandler } from "./";

export const LeaveMsgHandler: GameActHandler = {
  curStatus: "LEAVE_MSG",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
    // 结束发言
    room.gameController.tryEndState("LEAVE_MSG");

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    // 此阶段必须有 room.nextStateOfDieCheck, 否则无法进行后续状态
    if (!room.nextStateOfDieCheck) {
      throw new WError(500, "未设置死亡结算后去到的状态");
    }

    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
    if (room.currentDay === 1 || room.nextStateOfDieCheck === "WOLF_KILL") {
      // 如果是第一夜或者是放逐投票死的就有遗言
      // 进入留遗言环节
      return {
        action: "START",
      };
    } else {
      // 否则无遗言, 结束当前阶段
      return {
        action: "END",
      };
    }
  },

  endOfState(room) {
    return {
      nextState: "HUNTER_SHOOT",
    };
  },
};
