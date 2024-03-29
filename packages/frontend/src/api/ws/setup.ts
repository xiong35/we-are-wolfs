import { SERVER_DOMAIN, WSEvents, WS_PATH } from "@werewolf/shared";
import io from "socket.io-client";
import { showDialog } from "../../signals/dialog";
import { getToken } from "../../utils/token";
import { changeStatus } from "./handlers/changeStatus";
import { gameBegin } from "./handlers/gameBegin";
import { gameEnd } from "./handlers/gameEnd";
import { roomJoin } from "./handlers/roomJoin";
import { showWSMsg } from "./handlers/showWSMsg";
import { on } from "./tsHelper";

export let socket: SocketIOClient.Socket;

export function setupSocket() {
  const token = getToken();
  if (!token) return showDialog("请先登录");

  const { roomNumber } = token;
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

  on(socket, WSEvents.PING, (ping) => {
    console.log(ping);
  });
  on(socket, WSEvents.GAME_BEGIN, gameBegin);
  on(socket, WSEvents.GAME_END, gameEnd);
  on(socket, WSEvents.ROOM_JOIN, roomJoin);
  on(socket, WSEvents.SHOW_MSG, showWSMsg);
  on(socket, WSEvents.CHANGE_STATUS, changeStatus);

  socket.emit(WSEvents.FE_JOIN_ROOM, roomNumber);
}
