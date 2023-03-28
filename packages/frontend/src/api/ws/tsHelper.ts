import { MapWSEvent2Payload, WSEvents } from "@werewolf/shared";

export function on<E extends WSEvents>(
  socket: SocketIOClient.Socket,
  event: E,
  handler: HandlerOf<E>
) {
  socket.on(event, (p: MapWSEvent2Payload[E]) => {
    console.log("# ws on: ", event, "payload: ", p);
    handler(p);
  });
}

export type HandlerOf<E extends WSEvents> = (
  payload: MapWSEvent2Payload[E]
) => void;
