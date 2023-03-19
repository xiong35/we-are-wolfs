import {
  ICreateRoomReq,
  ICreateRoomResp,
  IGetRoomMetaReq,
  IGetRoomMetaResp,
  IJoinRoomReq,
  IJoinRoomResp,
} from "@werewolf/shared";
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

export async function createRoomReq(data: ICreateRoomReq) {
  const res = await request<ICreateRoomResp>({
    url: "/room/create",
    method: "POST",
    data,
  });

  return res;
}

export async function getRoomMetaReq(data?: IGetRoomMetaReq) {
  const res = await request<IGetRoomMetaResp>({
    url: "/room/meta",
    method: "GET",
    data,
  });

  return res;
}
