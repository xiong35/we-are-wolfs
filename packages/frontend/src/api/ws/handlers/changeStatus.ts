import { TIMEOUT, WSEvents } from "@werewolf/shared";
import { showDialog } from "../../../signals/dialog";
import {
  date,
  gameStatus,
  gameStatusTimeLeft,
  refresh,
  self,
} from "../../../signals/game";
import {
  getWolfKillResNShow,
  getWolfsNShow,
  witchGetDieNShow,
} from "../../http/gameGetHint";
import { HandlerOf } from "../tsHelper";

export const changeStatus: HandlerOf<WSEvents.CHANGE_STATUS> = async ({
  day,
  status,
  timeout,
}) => {
  date.value = day;
  gameStatus.value = status;

  gameStatusTimeLeft.value = timeout || TIMEOUT[status];

  await refresh();

  const selfVal = self.peek();

  let hintToShow: string | null = null;
  console.log("# changeStatus", { status, selfVal });
  if (status === "WOLF_KILL_CHECK" && selfVal.character === "WEREWOLF") {
    hintToShow = await getWolfKillResNShow();
  } else if (status === "WOLF_KILL" && selfVal.character === "WEREWOLF") {
    hintToShow = await getWolfsNShow();
  } else if (status === "WITCH_ACT" && selfVal.character === "WITCH") {
    hintToShow = await witchGetDieNShow();
  }

  if (hintToShow !== null) showDialog(hintToShow);
};
