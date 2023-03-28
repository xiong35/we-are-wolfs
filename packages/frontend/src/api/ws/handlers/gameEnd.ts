import { IPlayer, WSEvents } from "@werewolf/shared";
import { groupedGameEvents } from "../../../signals/computeGameEvents";
import { showDialog } from "../../../signals/dialog";
import { players, refresh, self } from "../../../signals/game";
import { saveRecord } from "../../../utils/record";
import { getToken } from "../../../utils/token";
import { socket } from "../setup";
import { HandlerOf } from "../tsHelper";

export const gameEnd: HandlerOf<WSEvents.GAME_END> = async (msg) => {
  socket.removeAllListeners();
  socket.disconnect();

  // console.log("# gameEnd", "end");
  // TODO game over

  await refresh();

  const time = Date.now();

  const { roomNumber } = getToken() || {};

  saveRecord(
    groupedGameEvents.peek(),
    roomNumber || "",
    self.peek(),
    players.peek() as IPlayer[],
    time
  );

  showDialog(
    `<b>游戏结束</b> </br> 获胜者为${
      msg.winner === "WEREWOLF" ? "狼人" : "村民"
    }`
  );

  // TODO
  // router.replace({
  //   name: "review-detail",
  //   query: {
  //     roomNumber: roomNumber.value,
  //     time,
  //   },
  // });
};
