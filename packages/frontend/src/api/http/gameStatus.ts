import { IGameStatusResp } from "@werewolf/shared";
import { request } from "./_request";

export async function gameStatusReq() {
  const res = await request<IGameStatusResp>({
    url: "/game/status",
    method: "GET",
  });

  return res;
}
