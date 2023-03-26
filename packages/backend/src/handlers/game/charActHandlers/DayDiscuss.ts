import { Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler } from "./";

export const DayDiscussHandler: GameActHandler = {
  curStatus: "DAY_DISCUSS",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    room.toFinishPlayers.delete(player.index);

    if (room.toFinishPlayers.size === 0) {
      room.gameController.tryEndState(DayDiscussHandler.curStatus);
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
    room.nextStateOfDieCheck = "WOLF_KILL";

    return {
      nextState: "EXILE_VOTE",
    };
  },
};
