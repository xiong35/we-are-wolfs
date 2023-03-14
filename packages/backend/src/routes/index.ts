import Router from "koa-router";

import gameRouter from "./game";
import roomRouter from "./room";
import testRouter from "./test";

const router = new Router();

router
  .use("/test", testRouter.routes(), testRouter.allowedMethods())
  .use("/room", roomRouter.routes(), roomRouter.allowedMethods())
  .use(
    "/game",
    // UseAuth(),
    gameRouter.routes(),
    gameRouter.allowedMethods()
  );

export default router;
