import { Index, WSEvents } from "@werewolf/shared";
import { Context } from "koa";

import { Player } from "../../../models/PlayerModel";
import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { getVoteResult, Vote } from "../../../utils/getVoteResult";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";
import { emit } from "../../../ws/tsHelper";
import { GameActHandler } from "./";

export const ExileVoteHandler: GameActHandler = {
  curStatus: "EXILE_VOTE",

  handleHttpInTheState(
    room: Room,
    player: Player,
    target: Index
  ) {
    if (!room.getPlayerByIndex(target).canBeVoted) {
      throw new WError(400, "此玩家不参与投票");
    }

    player.exileVotes[room.currentDay] = target;

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
      voteAt: p.exileVotes[room.currentDay],
    }));

    const highestVotes = getVoteResult(votes);

    // 如果没有全部弃票
    if (!highestVotes || highestVotes.length === 0) {
      // 如果所有人都弃票
      // 直接进入白天
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: "所有人都弃票, 即将进入夜晚",
      });

      return {
        nextState: "WOLF_KILL",
      };
    } else if (highestVotes.length === 1) {
      // 如果有票数最高的人
      // 此人被处死, 进入死亡结算
      room.getPlayerByIndex(highestVotes[0]).isDying = true;
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers("被处死的玩家为:", highestVotes),
      });

      room.curDyingPlayer = room.getPlayerByIndex(highestVotes[0]);

      room.curDyingPlayer.isDying = true;
      room.curDyingPlayer.isAlive = false;
      return {
        nextState: "EXILE_VOTE_CHECK",
        argsToNextStartOfState: ["LEAVE_MSG"],
      };
    } else {
      // 如果多人平票

      // 警长当 1.5 票
      const sheriff = room.players.find((p) => p.isSheriff);
      if (sheriff) {
        const sheriffChoice = sheriff.exileVotes[room.currentDay];
        if (highestVotes.includes(sheriffChoice)) {
          // 虽然有平票, 但是警长选择的人在此之中, 则此人死亡
          const toDie = room.getPlayerByIndex(highestVotes[0]);

          emit(room.roomNumber, WSEvents.SHOW_MSG, {
            innerHTML: renderHintNPlayers("被处死的玩家为:", [sheriffChoice]),
          });

          room.curDyingPlayer = toDie;
          toDie.isDying = true;
          toDie.isAlive = false;
          return {
            nextState: "EXILE_VOTE_CHECK",
            argsToNextStartOfState: ["LEAVE_MSG"],
          };
        }
      }

      // 若最高票中无警长的影响
      // 设置参与投票的人是他们几个
      // 设置他们未结束发言
      room.players.forEach(
        (p) => (p.canBeVoted = highestVotes.includes(p.index))
      );
      // 告知所有人现在应该再依次投票
      emit(room.roomNumber, WSEvents.SHOW_MSG, {
        innerHTML: renderHintNPlayers(
          "平票的玩家如下, 请再次依次进行发言",
          highestVotes
        ),
      });

      room.toFinishPlayers = new Set(highestVotes);

      // 设置下一阶段为自由发言
      return {
        nextState: "EXILE_VOTE_CHECK",
        argsToNextStartOfState: ["DAY_DISCUSS"],
      };
    }
  },
};
