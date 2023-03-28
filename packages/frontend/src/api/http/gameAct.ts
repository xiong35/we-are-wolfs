import { IGameActReq, ISeerActResp } from "@werewolf/shared";
import { request } from "./_request";

export async function gameActReq(
  data: IGameActReq
) {
  const res = await request<ISeerActResp>({
    url: "/game/act",
    method: "POST",
    data,
  });

  return res;
}
