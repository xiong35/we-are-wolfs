import { EGameStatus, Index } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { GameActHandler } from "./";

export const ExileVoteCheckHandler: GameActHandler = {
  curStatus: "EXILE_VOTE_CHECK",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  /**
   * @param nextState 在确认完结果后进入哪个状态
   */
  startOfState: function (room: Room, nextState: EGameStatus) {
    return {
      action: "START",
      argsToEndOfState: [nextState],
    };
  },

  /**
   * @param nextState 在确认完结果后进入哪个状态
   */
  endOfState(room: Room, nextState: EGameStatus) {
    return {
      nextState,
    };
  },
};
