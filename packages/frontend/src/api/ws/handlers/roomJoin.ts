import { IRoomJoinMsg, WSEvents } from "@werewolf/shared";
import { players } from "../../../signals/game";
import { HandlerOf } from "../tsHelper";

export const roomJoin: HandlerOf<WSEvents.ROOM_JOIN> = (msg: IRoomJoinMsg) => {
  console.log("#ws on room join", msg.players);

  players.value = msg.players;
};
