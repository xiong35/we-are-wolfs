import { IHttpResp, IWitchStatus } from "@werewolf/shared";
import { Middleware } from "koa";

import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { getBasicInfo } from "../../../utils/getBasicInfo";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";

export const witchGetDie: Middleware = async (ctx) => {
  const { player, playerID, room, roomNumber } = getBasicInfo(ctx);

  if (player.character !== "WITCH") {
    throw new WError(401, "你的身份无法查看此消息");
  }
  const status = player.characterStatus as IWitchStatus;
  if (status && status.MEDICINE?.usedDay !== undefined) {
    throw new WError(401, "你已经用过解药, 无法查看死者");
  }

  const killedByWolfToday = room.players.find(
    (p) => p.die?.fromCharacter === "WEREWOLF" && p.die?.at === room.currentDay
  );

  const ret: IHttpResp<string> = {
    status: 200,
    msg: "ok",
    data: "",
  };
  if (!killedByWolfToday) {
    ret.data = "今晚无人被杀害";
  } else {
    ret.data = renderHintNPlayers("今晚被杀害的是:", [killedByWolfToday.index]);
  }
  ctx.body = ret;
};
