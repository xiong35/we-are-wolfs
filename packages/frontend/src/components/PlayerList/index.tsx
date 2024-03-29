import styles from "./index.module.less";
import { FC } from "react";
import { IPublicPlayer } from "@werewolf/shared";
import { PlayerListItem } from "./components/PlayerListItem";
import { needingCharacters } from "../../signals/game";
import { useFormatedPlayerlist } from "./hooks/useFormatedPlayerlist";
import { target } from "../../signals/actions";

export type IPlayerListProps = {
  playerList: IPublicPlayer[];
};

export const PlayerList: FC<IPlayerListProps> = ({ playerList }) => {
  const formattedPlayerList = useFormatedPlayerlist(
    playerList,
    needingCharacters.value.length
  );

  return (
    <div className={styles["w-player_list"]}>
      {formattedPlayerList.map((item) => (
        <PlayerListItem
          key={item.index}
          isEmpty={!item.name}
          target={target.value}
          setTarget={(t) => (target.value = t)}
          player={item}
        ></PlayerListItem>
      ))}
    </div>
  );
};
