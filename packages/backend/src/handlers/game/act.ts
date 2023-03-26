import {
  HeaderPlayerID,
  HeaderRoomNumber,
  IGameActReq,
} from "@werewolf/shared";
import { IMiddleware } from "koa-router";

import { Room } from "../../models/RoomModel";
import { WError } from "../../utils/error";
import { validateIdentity } from "../../utils/validateIdentity";

/**
 * handle character action
 */
export const gameAct: IMiddleware = async (ctx) => {
  const req = ctx.request.body as IGameActReq;

  const roomNumber = ctx.get(HeaderRoomNumber);
  const playerID = ctx.get(HeaderPlayerID);

  const room = Room.getRoom(roomNumber);
  const player = room.getPlayerById(playerID);

  const isValidate = validateIdentity(room, player);
  if (isValidate !== true) {
    throw new WError(401, isValidate);
  }

  const gameStatus = room.curStatus;
  // TODO check character
  // TODO validate request

  console.log("# gameAct", { gameStatus }, player.name, req.target);

  // strategy pattern
  ctx.body = await room.gameController.handleHttp(player, req.target);
};
