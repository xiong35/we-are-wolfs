import { MapWSEvent2Payload, WSEvents } from "@werewolf/shared";
import io from "..";

export function emit<E extends WSEvents>(
  roomNumber: string,
  event: E,
  payload: MapWSEvent2Payload[E]
) {
  io.to(roomNumber).emit(event, payload);
}
