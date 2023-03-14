import { IMiddleware } from "koa-router";
import { Room } from "../../models/RoomModel";

export const logRoom: IMiddleware = async (ctx) => {
  const roomNumber = ctx.params.roomNumber;

  console.log("# logRoom", roomNumber);
  console.log("# logRoom", Room.getRoom(roomNumber));

  ctx.body = "ok";
};
