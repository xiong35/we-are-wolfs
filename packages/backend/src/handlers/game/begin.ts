import {
  HeaderPlayerID,
  HeaderRoomNumber,
  HttpStatusCode,
  IGameBeginResp,
  IHttpResp,
  WSEvents,
} from "@werewolf/shared";
import { IMiddleware } from "koa-router";

import io from "../../";
import { isDev } from "../../constants/env";
import { Room } from "../../models/RoomModel";
import { WError } from "../../utils/error";
import { GameController } from "./charActHandlers";

/**
 * handle game begin
 */
export const gameBegin: IMiddleware = async (ctx) => {
  const roomNumber = ctx.get(HeaderRoomNumber);
  const playerID = ctx.get(HeaderPlayerID);

  const room = Room.getRoom(roomNumber);
  if (room.creatorID !== playerID) {
    throw new WError(HttpStatusCode.UNAUTHORIZED, "只有房主才能开始游戏");
  }

  if (room.players.length !== room.needingCharacters.length + 1) {
    throw new WError(400, "房间人数未满, 无法开始游戏");
  }

  console.log("# game begin");

  const needingCharacters = [...room.needingCharacters];

  for (const p of room.players) {
    let index: number;
    if (isDev) {
      index = 0;
    } else {
      index = Math.floor(Math.random() * needingCharacters.length);
    }

    const character = needingCharacters.splice(index, 1)[0];

    p.character = character;
    switch (character) {
      case "GUARD":
        p.characterStatus = {
          protects: [],
        };
        break;
      case "HUNTER":
        p.characterStatus = {
          shootAt: {
            day: -1,
            playerIndex: -1,
          },
        };
        break;
      case "SEER":
        p.characterStatus = {
          checks: [],
        };
        break;
      case "WEREWOLF":
        p.characterStatus = {
          wantToKills: [],
        };
        break;
      case "WITCH":
        p.characterStatus = {
          POISON: { usedDay: -1, usedAt: -1 },
          MEDICINE: { usedDay: -1, usedAt: -1 },
        };
        break;
      case "VILLAGER":
        p.characterStatus = null;
      default:
        break;
    }
  }

  io.to(roomNumber).emit(WSEvents.GAME_BEGIN);

  room.gameController = new GameController(room);

  room.gameController.tryBeginState("WOLF_KILL");

  ctx.body = {
    data: "ok",
    msg: "ok",
    status: 200,
  } as IHttpResp<IGameBeginResp>;
};
