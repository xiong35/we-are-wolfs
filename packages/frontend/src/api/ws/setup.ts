import { SERVER_DOMAIN, WSEvents, WS_PATH } from "@werewolf/shared";
import io from "socket.io-client";

export let socket: SocketIOClient.Socket;

export function setupSocket(roomNumber: string) {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = io(SERVER_DOMAIN, {
    path: WS_PATH,
  });
  socket.on("connection", () => {
    console.log("#ws connected");
  });

  // TODO
  // on(socket, WSEvents.CHANGE_STATUS, changeStatus);
  // on(socket, WSEvents.GAME_BEGIN, gameBegin);
  // on(socket, WSEvents.GAME_END, gameEnd);
  // on(socket, WSEvents.ROOM_JOIN, roomJoin);
  // on(socket, WSEvents.SHOW_MSG, showWSMsg);

  socket.emit(WSEvents.FE_JOIN_ROOM, roomNumber);
}
