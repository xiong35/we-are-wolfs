import { MapWSEvent2Payload, WSEvents } from "@werewolf/shared";
import { Server } from "socket.io";

export function setup(io: Server) {
  io.sockets.on("connection", (socket) => {
    console.log("# wx index", "ws connected");

    socket.on(
      WSEvents.FE_JOIN_ROOM,
      (roomNumber: MapWSEvent2Payload[WSEvents.FE_JOIN_ROOM]) => {
        console.log("# wx index - join room", roomNumber, socket.id);
        socket.join(roomNumber);
      }
    );
  });
}
