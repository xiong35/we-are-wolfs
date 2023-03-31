import { HeaderPlayerID, HeaderRoomNumber } from "@werewolf/shared";
import { ParameterizedContext } from "koa";
import { Room } from "../models/RoomModel";
import { WError } from "./error";

export function getBasicInfo(ctx: ParameterizedContext) {
  const roomNumber = ctx.get(HeaderRoomNumber);
  const playerID = ctx.get(HeaderPlayerID);

  if (!roomNumber || !playerID)
    throw new WError(401, "roomNumber or playerID is undefined");

  const room = Room.getRoom(roomNumber);
  if (!room) throw new WError(404, "room not found");
  const player = room.getPlayerById(playerID);
  if (!player) throw new WError(404, "player not found");

  return {
    room,
    roomNumber,
    playerID,
    player,
  };
}
