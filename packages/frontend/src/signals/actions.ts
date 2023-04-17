import { signal } from "@preact/signals-react";
import { Index, EPotion, None } from "@werewolf/shared";
import { gameActReq } from "../api/http/gameAct";
import { showDialog } from "./dialog";
import { gameStatus } from "./game";

const isActing = signal(false);
/** 当前操作是否需要指定目标 */
export const noTarget = signal(false);
export const target = signal<Index>(None);
export const potion = signal<EPotion | null>(null);

export function getIsActing() {
  return isActing.value;
}

export function setIsActing(value: boolean) {
  isActing.value = value;
}

/** 像后端发动前端的操作 */
export async function act() {
  let t = target.value;

  if (potion.value === "POISON" && gameStatus.value === "WITCH_ACT") {
    t = -t;
  }

  const res = await gameActReq({
    target: t,
  });

  /* reset */
  resetActions();

  if (!res) {
    return showDialog("操作失败");
  }

  if (res.isWolf !== undefined) {
    showDialog(`该玩家为${res.isWolf ? "狼人" : "人类"}`, 3);
  } else {
    showDialog("操作成功!", 3);
  }
}

export function setTarget(index: Index) {
  if (!isActing.value) return;

  target.value = index;
}

export function resetActions() {
  potion.value = null;
  target.value = None;
  noTarget.value = false;
  isActing.value = false;
}
