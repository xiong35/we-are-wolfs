import { WSEvents } from "@werewolf/shared";
import { showDialog } from "../../signals/dialog";
import { HandlerOf } from "./tsHelper";

export const showWSMsg: HandlerOf<WSEvents.SHOW_MSG> = (msg) => {
  showDialog(msg.innerHTML, msg.showTime);
};
