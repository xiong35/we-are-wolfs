import { IGuardStatus, Index, IWitchStatus } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { GameActHandler } from "./";

export const GuardProtectHandler: GameActHandler = {
  curStatus: "GUARD_PROTECT",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    const status = player.characterStatus as IGuardStatus;
    status.protects = status.protects || [];

    const protects = status.protects;
    if (protects[room.currentDay - 2] === target && target) {
      // 如果两天保了同一个人
      throw new WError(400, "不能连续两天守护相同的人");
    } else {
      protects[room.currentDay] = target;
      const protectPlayer = room.getPlayerByIndex(target);
      // console.log("# GuardProtect", { protectPlayer });
      if (
        protectPlayer.die?.at === room.currentDay &&
        protectPlayer.die?.fromCharacter === "WEREWOLF"
      ) {
        // 如果确实是今天被杀了

        const witchStatus = room.players.find((p) => p.character === "WITCH")
          ?.characterStatus as IWitchStatus;
        if (
          witchStatus.MEDICINE?.usedAt === target &&
          witchStatus.MEDICINE?.usedDay === room.currentDay
        ) {
          // 如果女巫恰好还救了, 就奶死了
          protectPlayer.die = {
            at: room.currentDay,
            fromCharacter: "GUARD",
            fromIndex: [player.index],
          };
        } else {
          // 如果女巫没救
          // 设置了此人未被狼人杀死
          protectPlayer.die = null;
        }
      } // 如果今天没被杀, 无事发生
    }
    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room: Room) {
    // 如果没有守卫就直接开启猎人的阶段
    if (!room.needingCharacters.includes("GUARD")) {
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
    if (room.currentDay === 0) {
      return {
        nextState: "SHERIFF_ELECT",
      };
    } else {
      return {
        nextState: "BEFORE_DAY_DISCUSS",
      };
    }
  },
};
