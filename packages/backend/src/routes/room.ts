import * as Router from "koa-router";
import { joinRoom } from "../handlers/room/join";

const roomRouter = new Router();

// roomRouter.post("room create", "/create", roomCreate);
roomRouter.post("room join", "/join", joinRoom);
// roomRouter.post("room init", "/init", roomInit);

export default roomRouter;
