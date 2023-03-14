import {
  HeaderRoomNumber,
  IGetRoomMetaReq,
  IGetRoomMetaResp,
  IHttpResp,
} from "@werewolf/shared";
import { IMiddleware } from "koa-router";
import { Room } from "../../models/RoomModel";

export const getRoomMeta: IMiddleware = async (ctx) => {
  const roomNumber = ctx.get(HeaderRoomNumber);
  const room = Room.getRoom(roomNumber);

  const ret: IHttpResp<IGetRoomMetaResp> = {
    status: 200,
    msg: "ok",
    data: {
      players: room.choosePublicInfo(),
      needingCharacters: room.needingCharacters,
    },
  };

  ctx.body = ret;
};
