import { Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler } from "./";

export const HunterCheckHandler: GameActHandler = {
  curStatus: "HUNTER_CHECK",

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
      nextState: "SHERIFF_ASSIGN",
    };
  },
};
