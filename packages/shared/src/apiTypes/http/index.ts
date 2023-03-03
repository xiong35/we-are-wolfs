export interface IHttpRes<T = {}> {
  status: number;
  msg: string;
  data: T;
}

export * from "./characterAct";
export * from "./gameStatus"
export * from "./roomCreate";
export * from "./roomJoin";
export * from "./roomInit";
