import { HttpStatusCode } from "../../utils";

export interface IHttpResp<T = {}> {
  status: HttpStatusCode;
  msg: string;
  data: T;
}

export * from "./seerAct";
export * from "./gameStatus";
export * from "./roomCreate";
export * from "./roomJoin";
export * from "./roomGetMeta";
export * from "./gameBegin";
export * from "./gameAct";
