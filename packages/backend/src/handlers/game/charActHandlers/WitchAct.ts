import { Index, IWitchStatus } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { GameActHandler } from "./";

export const WitchActHandler: GameActHandler = {
  curStatus: "WITCH_ACT",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
    const status = player.characterStatus as IWitchStatus;
    if (
      status.MEDICINE?.usedDay === room.currentDay ||
      status.POISON?.usedDay === room.currentDay
    ) {
      throw new WError(400, "一天只能使用一瓶药");
    }

    // 正编号代表救人, 负编号代表杀人
    if (target < 0) {
      // 杀人
      room.getPlayerByIndex(-target).die = {
        at: room.currentDay,
        fromCharacter: "WITCH",
        fromIndex: [player.index],
      };
      status.POISON = {
        usedAt: -target,
        usedDay: room.currentDay,
      };
    } else {
      // 救人
      const savedPlayer = room.getPlayerByIndex(target);
      if (
        savedPlayer.die?.fromCharacter === "WEREWOLF" &&
        savedPlayer.die?.at === room.currentDay
      ) {
        // 女巫只能救今天被狼人杀的人
        if (savedPlayer.id === player.id && room.currentDay !== 0) {
          throw new WError(400, "女巫只有第一夜才能自救");
        }

        // 设置成功救人
        savedPlayer.die.saved = true;
        savedPlayer.isAlive = true;
        status.MEDICINE = {
          usedAt: target,
          usedDay: room.currentDay,
        };
      } else {
        throw new WError(400, "女巫只能救今天被狼人杀的人");
      }
    }

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    // 如果没有女巫就直接结束此阶段
    if (!room.needingCharacters.includes("WITCH")) {
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
      nextState: "GUARD_PROTECT",
    };
  },
};
