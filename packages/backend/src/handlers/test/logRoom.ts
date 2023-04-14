import { IMiddleware } from "koa-router";
import { Room } from "../../models/RoomModel";

export const logRoom: IMiddleware = async (ctx) => {
  const roomNumber = ctx.params.roomNumber;
  const room = Room.getRoom(roomNumber);

  console.log("# logRoom", roomNumber);
  console.log("# logRoom", room);

  ctx.body = room.toString();
};
