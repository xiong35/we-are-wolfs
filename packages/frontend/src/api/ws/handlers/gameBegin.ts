import { WSEvents } from "@werewolf/shared";
import { router } from "../../../router";
import { showDialog } from "../../../signals/dialog";
import { HandlerOf } from "../tsHelper";

export const gameBegin: HandlerOf<WSEvents.GAME_BEGIN> = () => {
  console.log("#ws on game begin");

  showDialog("游戏开始, 天黑请闭眼👁️");
  setTimeout(() => {
    router.navigate("/play");
  }, 500);
};
