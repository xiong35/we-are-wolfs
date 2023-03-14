import {
  ICreateRoomReq,
  ICreateRoomResp,
  IHttpResp,
  log,
} from "@werewolf/shared";
import { IMiddleware } from "koa-router";
import { Player } from "../../models/PlayerModel";
import { Room } from "../../models/RoomModel";

export const createRoom: IMiddleware = async (ctx) => {
  const req = ctx.request.body as ICreateRoomReq;

  const creator = new Player(req.creatorName, 1);

  const room = new Room({ ...req, creator });

  const ret: IHttpResp<ICreateRoomResp> = {
    status: 200,
    msg: "ok",
    data: {
      roomNumber: room.roomNumber,
      id: creator.id,
    },
  };

  console.log("# createRoom", { room, creator });

  ctx.body = ret;
};
