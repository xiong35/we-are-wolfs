import { Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler } from "./";

export const WolfKillCheckHandler: GameActHandler = {
  curStatus: "WOLF_KILL_CHECK",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
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
      nextState: "SEER_CHECK",
    };
  },
};
