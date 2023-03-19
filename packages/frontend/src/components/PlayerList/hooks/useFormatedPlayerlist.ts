import { IPublicPlayer } from "@werewolf/shared";
import { useMemo, useState } from "react";

export function useFormatedPlayerlist(
  playerList: IPublicPlayer[],
  sum: number
) {
  return useMemo(() => {
    let formattedPlayerList = [...playerList];
    for (let i = 1; i < sum + 1; i++) {
      if (!formattedPlayerList[i])
        formattedPlayerList[i] = { index: i } as IPublicPlayer;
    }

    formattedPlayerList.shift();
    console.log({ formattedPlayerList });

    return formattedPlayerList;
  }, [playerList.length]);
}
