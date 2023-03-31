import { IPublicPlayer } from "@werewolf/shared";
import { useMemo, useState } from "react";

export function useFormatedPlayerlist(
  playerList: IPublicPlayer[],
  sum: number
) {
  return useMemo(() => {
    let formattedPlayerList = [...playerList];
    for (let i = 0; i < sum; i++) {
      if (!formattedPlayerList[i])
        formattedPlayerList[i] = { index: i + 1 } as IPublicPlayer;
    }

    return formattedPlayerList;
  }, [playerList.length]);
}
