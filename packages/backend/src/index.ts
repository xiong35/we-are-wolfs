import { createServer } from "http";
import Koa from "koa";
import KoaBody from "koa-body";
import logger from "koa-logger";
import { Server } from "socket.io";

import cors from "@koa/cors";
import { useHandleError } from "./middleware/handleError";
import { WS_PATH_CLIPPED } from "@werewolf/shared";
import router from "./routes";
import { setup } from "./ws";

const app = new Koa<
  { isKnownError: Boolean },
  { error: (status: number, msg: string) => void }
>();

const httpServer = createServer(app.callback());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  path: WS_PATH_CLIPPED,
});

setup(io);

app
  .use(logger())
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(useHandleError())
  .use(KoaBody())

  .use(router.routes())
  .use(router.allowedMethods());

httpServer.listen(3011);

console.log("listen on 3011");

export default io;
