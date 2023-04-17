import { IGameActReq, ISeerActResp } from "@werewolf/shared";
import { gameStatus } from "../../signals/game";
import { request } from "./_request";

export async function gameActReq(data: IGameActReq) {
  const res = await request<ISeerActResp>({
    url: `/game/act?status=${gameStatus.peek()}`,
    method: "POST",
    data,
  });

  return res;
}
