import { IPublicPlayer } from "@werewolf/shared";

export function useFormatedPlayerlist(
  playerList: IPublicPlayer[],
  sum: number
) {
  let formattedPlayerList = [...playerList];
  for (let i = 0; i < sum; i++) {
    if (!formattedPlayerList[i])
      formattedPlayerList[i] = { index: i + 1 } as IPublicPlayer;
  }

  return formattedPlayerList;
}
