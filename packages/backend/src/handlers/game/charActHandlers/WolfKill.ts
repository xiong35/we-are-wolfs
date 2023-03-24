import {
  Index,
  IShowMsgMsg,
  IWerewolfStatus,
  None,
  WSEvents,
} from "@werewolf/shared";
import { Context } from "koa";

import io from "../../..";
import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { getVoteResult } from "../../../utils/getVoteResult";
import { GameActHandler } from "./";

export const WolfKillHandler: GameActHandler = {
  curStatus: "WOLF_KILL",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index,
    ctx: Context
  ) {
    // 记录想杀谁
    const status = player.characterStatus as IWerewolfStatus;
    status.wantToKills = status.wantToKills || [];
    status.wantToKills[room.currentDay] = target;

    return {
      status: 200,
      msg: "ok",
      data: { target },
    };
  },

  startOfState(room) {
    if (room.currentDay === None) {
      io.to(room.roomNumber).emit(WSEvents.SHOW_MSG, {
        innerHTML: "天黑请闭眼👁️",
      } as IShowMsgMsg);
    }

    /** IMPORTANT 狼人杀人刚开始时 curDay ++，进入晚上*/
    room.currentDay++;

    type A = { foo: number } | { bar: string };
    const a: A = { foo: 1 };
    console.log(a.foo);

    return {
      action: "START",
    };
  },

  endOfState(room) {
    // 准备工作
    const werewolfs = room.players.filter((p) => p.character === "WEREWOLF");
    const today = room.currentDay;
    const votes = werewolfs.map((p) => ({
      from: p.index,
      voteAt: (p.characterStatus as IWerewolfStatus).wantToKills[today],
    }));
    console.log("# WolfKill", { votes });

    // 找到死者
    const voteRes = getVoteResult(votes);
    // console.log("# WolfKill", { voteRes });
    if (voteRes !== null) {
      // 如果没有放弃杀人'
      const toKillIndex = voteRes[0]; // 现在的处理是平票就刀index小的
      const toKillPlayer = room.getPlayerByIndex(toKillIndex);

      if (!toKillPlayer) {
        throw new WError(400, "杀人目标不存在");
      }
      // 设置死亡
      toKillPlayer.die = {
        at: today,
        fromIndex: werewolfs.reduce<Index[]>(
          (prev, cur) =>
            (cur.characterStatus as IWerewolfStatus).wantToKills[today] ===
            toKillIndex
              ? [...prev, cur.index]
              : prev,
          []
        ),
        fromCharacter: "WEREWOLF",
      };
      console.log("# WolfKill", { toKillPlayer });
    } else {
      // 全员不出刀
      console.log("# WolfKill pass");
    }

    // 进入下一状态， 狼人确认杀人结果
    return {
      nextState: "WOLF_KILL_CHECK",
    };
  },
};
