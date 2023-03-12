import { Middleware } from "koa";
import { IErrorMsg, WError } from "../utils/error";

// TODO useAuth 的中间件

export const useHandleError = function (): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof WError) {
        const errorMessage: IErrorMsg = JSON.parse(err.message);
        ctx.body = errorMessage;
      } else {
        ctx.body = {
          status: 500,
          msg: String(err),
        };
      }
      console.error(err);
    } finally {
      ctx.status = 200;
    }
  };
};
