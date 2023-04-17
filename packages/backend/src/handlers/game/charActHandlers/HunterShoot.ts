import { IHunterStatus, Index, None, WSEvents } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { emit } from "../../../ws/tsHelper";
import { GameActHandler } from "./";

export const HunterShootHandler: GameActHandler = {
  curStatus: "HUNTER_SHOOT",

  handleHttpInTheState(room: Room, player: Player, target: Index) {
    if (target === None) {
      throw new WError(400, "未指定目标");
    }

    // console.log("# HunterShoot", { player });
    if (player.die?.fromCharacter === "WITCH") {
      // 如果被女巫毒死了就不能开枪
      throw new WError(400, "你被女巫毒死, 无法开枪");
    }

    const status = player.characterStatus as IHunterStatus;
    if (status.shootAt.playerIndex > 0) {
      throw new WError(400, "你已经开过枪了");
    }

    status.shootAt = {
      day: room.currentDay,
      playerIndex: target,
    };

    const targetPlayer = room.getPlayerByIndex(target);
    targetPlayer.isAlive = false;
    targetPlayer.isDying = true;
    targetPlayer.die = {
      at: room.currentDay,
      fromCharacter: "HUNTER",
      fromIndex: [player.index],
    };

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    // 玩家死亡后依次进行以下检查
    // 遗言发表检查, 猎人开枪检查, 警长传递警徽检查
    if (!checkShouldShowHunter(room)) {
      console.log("# HunterShoot", "not show hunter");
      return {
        action: "END",
        argsToEndOfState: [false],
      };
    } else {
      // console.log("# HunterShoot", "show hunter");
      return {
        action: "START",
        argsToEndOfState: [true],
      };
    }
  },

  endOfState(room, shouldShowHunter: boolean) {
    if (!shouldShowHunter) {
      // 无猎人? 直接取消这两个阶段
      // console.log("# HunterShoot", "really not show hunter");
      return {
        nextState: "SHERIFF_ASSIGN",
      };
    }

    const shotByHunter = room.players.find(
      (p) => p.die?.fromCharacter === "HUNTER"
    );

    if (!shotByHunter) {
      // 到点了未选择则不进行操作, 直接进入警长传警徽阶段, 或者无猎人
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: "死者不是猎人或选择不开枪或无法开枪",
      });
    } else {
      // 如果死人了, 通知死人了
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers("猎人开枪射杀了", [shotByHunter.index]),
      });
    }

    return {
      nextState: "HUNTER_CHECK",
    };
  },
};

/**
 * 是否需要让大家等猎人开枪
 * 如果猎人开过枪或者无猎人就不需要进行此阶段了
 */
function checkShouldShowHunter(room: Room): boolean {
  // console.log("# HunterShoot", { room });
  if (!room.needingCharacters.includes("HUNTER")) return false;

  const hunter = room.players.find((p) => p.character === "HUNTER");

  // console.log("# HunterShoot", {
  //   hunter: hunter?.characterStatus?.shootAt,
  // });
  if (!hunter) return false;

  const { shootAt } = hunter.characterStatus as IHunterStatus;
  if (shootAt.playerIndex > 0) return false;

  return true;
}
