import { IHttpResp, IJoinRoomReq, IJoinRoomResp } from "@werewolf/shared";
import { IMiddleware } from "koa-router";
import { Room } from "../../models/RoomModel";

export const joinRoom: IMiddleware = async (ctx) => {
  const req = ctx.request.body as IJoinRoomReq;
  const { name, password, roomNumber } = req;

  const room = Room.getRoom(roomNumber);
  const player = room.playerJoin(name, password);

  const ret: IHttpResp<IJoinRoomResp> = {
    status: 200,
    msg: "ok",
    data: {
      ID: player._id,
      index: player.index,
      needingCharacters: room.needingCharacters,
    },
  };

  // TODO socket
  // const roomJoinMsg: RoomJoinMsg = room.choosePublicInfo();

  // io.to(roomNumber).emit(Events.ROOM_JOIN, roomJoinMsg);

  ctx.body = ret;
};
