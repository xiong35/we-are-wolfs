import { IChangeStatusMsg } from "./changeStatus";
import { IGameEndMsg } from "./gameEnd";
import { IRoomJoinMsg } from "./roomJoin";
import { IShowMsgMsg } from "./showMsg";

/** 后端向前端发送的 socket 信息 */
export type MapWSEvent2Payload = {
  [K in WSEvents]: PayloadTypeForEvent<K>;
};

export enum WSEvents {
  ROOM_JOIN = "ROOM_JOIN",
  GAME_BEGIN = "GAME_BEGIN",
  CHANGE_STATUS = "CHANGE_STATUS",
  SHOW_MSG = "SHOW_MSG",
  GAME_END = "GAME_END",
  FE_JOIN_ROOM = "FE_JOIN_ROOM",
  PING = "PING",
  // NOTICE_ME = "NOTICE_ME",
}

/** 在这里写 WSEvents 对应的 payload 类型，没写就会被设为 never（后面会报错）*/
type PayloadTypeForEvent<Event extends WSEvents> =
  Event extends WSEvents.ROOM_JOIN
    ? IRoomJoinMsg
    : Event extends WSEvents.GAME_BEGIN
    ? null
    : Event extends WSEvents.CHANGE_STATUS
    ? IChangeStatusMsg
    : Event extends WSEvents.SHOW_MSG
    ? IShowMsgMsg
    : Event extends WSEvents.GAME_END
    ? IGameEndMsg
    : Event extends WSEvents.FE_JOIN_ROOM
    ? string
    : Event extends WSEvents.PING
    ? "PING"
    : never;

/** 去除一个对象类型中 value 为 never 的 keys */
type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

/** 检查两个 union 是否 完全一致 */
type CheckIsSame<T, U> = Exclude<T, U> extends never
  ? Exclude<U, T> extends never
    ? true
    : false
  : false;
type IsMapWSEvent2PayloadSynced = CheckIsSame<
  WSEvents,
  keyof OmitNever<MapWSEvent2Payload> // 未设置 payload 类型的 key
>;

// 这将在MapWSEvent2Payload与WSEvents不同步时导致类型错误
type AssertMapWSEvent2PayloadSynced = IsMapWSEvent2PayloadSynced extends true
  ? unknown
  : "MapWSEvent2Payload is not in sync with WSEvents";

function assertMapWSEvent2PayloadSynced(
  dummy: AssertMapWSEvent2PayloadSynced
): void {}
assertMapWSEvent2PayloadSynced(undefined);
