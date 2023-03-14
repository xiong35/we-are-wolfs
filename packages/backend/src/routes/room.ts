import Router from "koa-router";
import { createRoom } from "../handlers/room/create";
import { getRoomMeta } from "../handlers/room/getMeta";
import { joinRoom } from "../handlers/room/join";

const roomRouter = new Router();

roomRouter.post("room create", "/create", createRoom);
roomRouter.post("room join", "/join", joinRoom);
roomRouter.get("room meta", "/meta", getRoomMeta);

export default roomRouter;
