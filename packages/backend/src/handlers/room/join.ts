import {
  IHttpResp,
  IJoinRoomReq,
  IJoinRoomResp,
  IRoomJoinMsg,
  WSEvents,
} from "@werewolf/shared";
import { IMiddleware } from "koa-router";
import io from "../..";
import { Room } from "../../models/RoomModel";
import { emit } from "../../ws/tsHelper";

export const joinRoom: IMiddleware = async (ctx) => {
  const req = ctx.request.body as IJoinRoomReq;
  const { name, password, roomNumber } = req;

  const room = Room.getRoom(roomNumber);
  const player = room.playerJoin(name, password);

  const ret: IHttpResp<IJoinRoomResp> = {
    status: 200,
    msg: "ok",
    data: {
      id: player.id,
      index: player.index,
      needingCharacters: room.needingCharacters,
    },
  };

  emit(roomNumber, WSEvents.ROOM_JOIN, {
    players: room.choosePublicInfo(),
  });

  ctx.body = ret;
};
