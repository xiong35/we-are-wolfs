import { IGameStatusResp, IHttpResp } from "@werewolf/shared";
import { IMiddleware } from "koa-router";
import { getBasicInfo } from "../../utils/getBasicInfo";

export const getStatus: IMiddleware = async (ctx) => {
  const { player, room } = getBasicInfo(ctx);

  const ret: IHttpResp<IGameStatusResp> = {
    status: 200,
    msg: "ok",
    data: {
      self: player,
      curDay: room.currentDay,
      gameStatus: room.curStatus,
      players: room.isFinished ? room.players : room.choosePublicInfo(),
    },
  };

  ctx.body = ret;
};
