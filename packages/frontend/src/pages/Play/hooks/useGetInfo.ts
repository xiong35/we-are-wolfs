import { useEffect, useState } from "react";
import { setupSocket } from "../../../api/ws/setup";
import { router } from "../../../router";
import { showDialog } from "../../../signals/dialog";
import { refresh } from "../../../signals/game";
import { getToken } from "../../../utils/token";

export function useGetInfo() {
  useEffect(() => {
    const token = getToken();
    if (token === null) {
      showDialog("未加入房间或房间已过期!");
      router.navigate("/");
    } else {
      setupSocket();
      refresh();
    }
  }, []);
}
