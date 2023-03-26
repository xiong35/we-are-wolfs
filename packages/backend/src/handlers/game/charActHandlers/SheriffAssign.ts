import { Index, WSEvents } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { emit } from "../../../ws/tsHelper";
import { GameActHandler } from "./";

export const SheriffAssignHandler: GameActHandler = {
  curStatus: "SHERIFF_ASSIGN",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    const targetPlayer = room.getPlayerByIndex(target);
    targetPlayer.isSheriff = true;
    player.isSheriff = false;
    player.sheriffAssigns[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查

    if (
      !room.players.find((p) => p.isSheriff) ||
      !room.curDyingPlayer.isSheriff
    ) {
      // 死者不是警长或无警长, 直接结束
      return {
        action: "END",
        argsToEndOfState: [false],
      };
    }

    return {
      action: "START",
    };
  },

  endOfState(room, showSheriff: boolean = true) {
    if (!showSheriff) {
      // 无警长就直接清算
      return {
        nextState: room.gameController.gotoNextStateAfterHandleDie(),
      };
    } else {
      // TODO 通知发表遗言的时间

      // 去除现在死的玩家的警长身份
      room.curDyingPlayer.isSheriff = false;

      const nextSheriff = room.players.find((p) => p.isSheriff);
      if (!nextSheriff) {
        emit(room.roomNumber, WSEvents.SHOW_MSG, {
          innerHTML: "上任警长选择不传警徽, 现在没有警长了",
        });
      } else {
        emit(room.roomNumber, WSEvents.SHOW_MSG, {
          innerHTML: renderHintNPlayers("下一任警长为", [nextSheriff.index]),
        });
      }

      return {
        nextState: "SHERIFF_ASSIGN_CHECK",
      };
    }
  },
};
