import { showDialog } from "../../signals/dialog";
import { request } from "./_request";

/**
 * 获得狼人杀人结果并显示弹窗
 * @returns 结果
 */
export async function getWolfKillResNShow() {
  const res = await request<string>({
    url: "/game/hint/wolfKill",
    method: "GET",
  });

  return res;
}

/**
 * 获得狼人队友并显示弹窗
 * @returns 结果
 */
export async function getWolfsNShow() {
  const res = await request<string>({
    url: "/game/hint/getWolfs",
    method: "GET",
  });

  return res;
}

/**
 * 女巫获得狼人杀人结果并显示弹窗
 * @returns 结果
 */
export async function witchGetDieNShow() {
  const res = await request<string>({
    url: "/game/hint/witchGetDie",
    method: "GET",
  });

  return res;
}
