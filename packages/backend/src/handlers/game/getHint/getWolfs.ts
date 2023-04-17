import { HeaderRoomNumber, IHttpResp } from "@werewolf/shared";
import { Middleware } from "koa";

import { Room } from "../../../models/RoomModel";
import { WError } from "../../../utils/error";
import { getBasicInfo } from "../../../utils/getBasicInfo";
import { renderHintNPlayers } from "../../../utils/renderHintNPlayers";

export const getWolfs: Middleware = async (ctx) => {
  const { player, playerID, room, roomNumber } = getBasicInfo(ctx);

  if (player.character !== "WEREWOLF") {
    throw new WError(401, "你的身份无法查看此消息");
  }

  const wolfs = room.players
    .filter((p) => p.character === "WEREWOLF" && p.id !== playerID)
    .map((p) => p.index);

  const ret: IHttpResp<string> = {
    status: 200,
    msg: "ok",
    data: "",
  };

  if (wolfs.length) {
    ret.data = renderHintNPlayers("狼队友是:", wolfs);
  } else {
    ret.data = "你没有狼队友";
  }

  ctx.body = ret;
};
