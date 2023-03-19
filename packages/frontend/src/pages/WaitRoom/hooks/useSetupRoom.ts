import { useEffect, useState } from "react";
import { getRoomMetaReq } from "../../../api/http/room";
import { setupSocket } from "../../../api/ws/setup";
import { showDialog } from "../../../signals/dialog";
import { needingCharacters, players } from "../../../signals/game";

export function useSetupRoom() {
  useEffect(() => {
    setRoomMeta();
    setupSocket();
  }, []);
}

async function setRoomMeta() {
  const res = await getRoomMetaReq();
  if (!res) return showDialog("未能得到房间数据，请刷新界面");

  const { needingCharacters: n, players: p } = res;

  needingCharacters.value = n;
  players.value = p;
}
