import { Index, WSEvents } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { getVoteResult, Vote } from "../../../utils/getVoteResult";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { emit } from "../../../ws/tsHelper";
import { GameActHandler } from "./";

export const SheriffVoteHandler: GameActHandler = {
  curStatus: "SHERIFF_VOTE",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
    if (!room.getPlayerByIndex(target)?.canBeVoted) {
      throw new WError(400, "选择的玩家未参与竞选");
    }

    if (player.canBeVoted) {
      throw new WError(400, "参选者不能投票");
    }

    player.sheriffElectVote = target;

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
    const votes: Vote[] = room.players.map((p) => ({
      from: p.index,
      voteAt: p.sheriffElectVote,
    }));

    // 找到警长人选
    const highestVotes = getVoteResult(votes);
    console.log("# SheriffVote", { votes });
    console.log("# SheriffVote", { highestVotes });

    // 如果没有全部弃票
    if (!highestVotes || highestVotes.length === 0) {
      // 如果所有人都弃票
      // 直接进入白天

      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: "所有人都弃票, 即将进入自由发言阶段",
      });

      return {
        nextState: "SHERIFF_VOTE_CHECK",
      };
    } else if (highestVotes.length === 1) {
      // 如果有票数最高的人
      // 此人当选, 进入白天
      room.getPlayerByIndex(highestVotes[0]).isSheriff = true;

      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers("当选警长的玩家为:", highestVotes),
      });

      return {
        nextState: "SHERIFF_VOTE_CHECK",
      };
    } else {
      // 如果多人平票
      room.toFinishPlayers = new Set(highestVotes);
      // 设置参与警长竞选的人是他们几个
      room.players.forEach((p) => {
        p.canBeVoted = room.toFinishPlayers.has(p.index);
        // 设置所有人警长投票为空
        p.sheriffElectVote = undefined;
      });

      // 告知所有人现在应该再依次投票
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "竞争警长的玩家如下, 请再次依次进行发言",
          highestVotes
        ),
      });

      // 设置下一阶段为警长发言
      return {
        nextState: "SHERIFF_SPEECH",
      };
    }
  },
};
