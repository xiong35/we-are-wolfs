import { Index } from "@werewolf/shared";
import { Middleware } from "koa";
import { WError } from "../../../utils/error";

import { getBasicInfo } from "../../../utils/getBasicInfo";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";

export const getWolfKillResult: Middleware = async (ctx) => {
  const { player, playerID, room, roomNumber } = getBasicInfo(ctx);

  if (player.character !== "WEREWOLF") {
    throw new WError(401, "你的身份无法查看此消息");
  }

  const finalTarget = room.players.find((player) => {
    if (!player.die) return false;
    const { at, fromCharacter } = player.die;
    return at === room.currentDay && fromCharacter === "WEREWOLF"; // 今天被狼杀死的目标即为投票结果
  });

  let data: { hintText: string; result?: Index[] };

  if (!finalTarget) {
    data = {
      hintText: "今晚是个平安夜",
    };
  } else {
    data = {
      hintText: "今晚被杀的是",
      result: [finalTarget.index],
    };
  }

  const ret = {
    status: 200,
    msg: "ok",
    data: renderHintNPlayers(data.hintText, data.result),
  };
  ctx.body = ret;
};
