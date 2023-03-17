import { IJoinRoomReq, IJoinRoomResp } from "@werewolf/shared";
import { request } from "./_request";

export async function joinRoomReq(
  data: IJoinRoomReq
): Promise<IJoinRoomResp | null> {
  const res = await request<IJoinRoomResp>({
    url: "/room/join",
    method: "POST",
    data,
  });

  return res;
}
