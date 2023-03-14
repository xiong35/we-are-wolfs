import { HttpStatusCode } from "../../utils";

export interface IHttpResp<T = {}> {
  status: HttpStatusCode;
  msg: string;
  data: T;
}

export * from "./characterAct";
export * from "./gameStatus"
export * from "./roomCreate";
export * from "./roomJoin";
export * from "./roomGetMeta";
