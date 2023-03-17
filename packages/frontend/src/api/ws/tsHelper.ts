import { MapWSEvent2Payload, WSEvents } from "@werewolf/shared";

export function on<E extends WSEvents>(
  socket: SocketIOClient.Socket,
  event: E,
  handler: HandlerOf<E>
) {
  socket.on(event, handler);
}

export type HandlerOf<E extends WSEvents> = (
  payload: MapWSEvent2Payload[E]
) => void;
