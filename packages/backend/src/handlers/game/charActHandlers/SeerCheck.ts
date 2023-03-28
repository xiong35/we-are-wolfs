import { IHttpResp, Index, ISeerActResp, ISeerStatus } from "@werewolf/shared";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { GameActHandler } from "./";

export const SeerCheckHandler: GameActHandler = {
  curStatus: "SEER_CHECK",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
    const targetPlayer = room.getPlayerByIndex(target);

    if (!targetPlayer) throw new WError(400, "未找到此玩家");

    const status = player.characterStatus as ISeerStatus;

    if (status.checks?.[room.currentDay]) {
      throw new WError(400, "一天只能查验一次");
    }

    const isWolf = targetPlayer.character === "WEREWOLF";

    status.checks = status.checks || [];
    status.checks[room.currentDay] = {
      index: target,
      isWerewolf: isWolf,
    };

    const ret: IHttpResp<ISeerActResp> = {
      data: {
        isWolf,
      },
      msg: "ok",
      status: 200,
    };
    return ret;
  },

  startOfState(room: Room) {
    // 如果没有预言家就直接结束此阶段
    if (!room.needingCharacters.includes("SEER")) {
      return {
        action: "END",
      };
    } else {
      return {
        action: "START",
      };
    }
  },

  endOfState(room: Room) {
    return {
      nextState: "WITCH_ACT",
    };
  },
};
