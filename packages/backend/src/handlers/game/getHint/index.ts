import Router from "koa-router";

import { getWolfs } from "./getWolfs";
import { witchGetDie } from "./witchGetDie";
import { getWolfKillResult } from "./wolfKill";

export const hintRouter = new Router();

hintRouter.get("game hint wolfKill", "/wolfKill", getWolfKillResult);

hintRouter.get("game hint witchGetDie", "/witchGetDie", witchGetDie);

hintRouter.get("game hint getWolfs", "/getWolfs", getWolfs);
