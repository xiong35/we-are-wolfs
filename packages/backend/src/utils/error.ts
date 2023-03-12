import { HttpStatusCode } from "@werewolf/shared";

export type IErrorMsg = {
  status: HttpStatusCode;
  msg: string;
};

/**
 * 接受 status 和 msg，将其包装成 json 字符串传给 Error 的 message
 */
export class WError extends Error {
  constructor(status: HttpStatusCode, msg: string) {
    super(JSON.stringify({ status, msg }));
  }
}
