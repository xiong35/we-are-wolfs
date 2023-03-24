import { Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler } from ".";

export const SheriffSpeechHandler: GameActHandler = {
  curStatus: "SHERIFF_SPEECH",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    // 结束自己的发言
    room.toFinishPlayers.delete(player.index);

    // 如果所有人都发言完毕, 进入警长投票环节
    if (room.toFinishPlayers.size === 0) {
      room.gameController.tryBeginState("SHERIFF_VOTE");
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    return {
      action: "START",
    };
  },

  endOfState(room: Room) {
    return {
      nextState: "SHERIFF_VOTE",
    };
  },
};
