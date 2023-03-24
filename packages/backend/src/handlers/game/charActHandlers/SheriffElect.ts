import { Index, WSEvents } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { emit } from "../../../ws/tsHelper";
import { GameActHandler } from "./";

export const SheriffElectHandler: GameActHandler = {
  curStatus: "SHERIFF_ELECT",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    // 加入参与竞选的人
    player.canBeVoted = true;

    return {
      status: 200,
      msg: "ok",
      data: {},
    };
  },

  startOfState(room: Room) {
    /** IMPORTANT 第一天选举开始时 curDay ++ */
    room.currentDay++;

    return {
      action: "START",
    };
  },

  endOfState(room: Room) {
    const electingPlayers = room.players.filter((p) => p.canBeVoted);

    if (electingPlayers.length === 0) {
      // 无人竞选就直接到天亮
      return {
        nextState: "BEFORE_DAY_DISCUSS",
      };
    } else if (electingPlayers.length === 1) {
      // 只有一人竞选就把警长给他
      electingPlayers[0].isSheriff = true;
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers("仅有此玩家参选, 直接成为警长", [
          electingPlayers[0].index,
        ]),
      });

      return {
        nextState: "BEFORE_DAY_DISCUSS",
      };
    } else {
      // 有多人参选
      // 设置参选警长的人都未结束发言
      room.toFinishPlayers = new Set(electingPlayers.map((p) => p.index));
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "参选警长的玩家如下, 请依次进行发言",
          electingPlayers.map((p) => p.index)
        ),
      });
      return {
        nextState: "SHERIFF_SPEECH",
      };
    }
  },
};
