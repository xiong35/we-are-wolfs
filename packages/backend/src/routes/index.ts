import Router from "koa-router";

import gameRouter from "./game";
import roomRouter from "./room";

const router = new Router();

router.use("/room", roomRouter.routes(), roomRouter.allowedMethods()).use(
  "/game",
  // UseAuth(),
  gameRouter.routes(),
  gameRouter.allowedMethods()
);

export default router;
