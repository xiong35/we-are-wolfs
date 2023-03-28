import styles from "./index.module.less";
import { FC, useState } from "react";
import { Index, IPublicPlayer, None } from "@werewolf/shared";
import { PlayerListItem } from "./components/PlayerListItem";
import { needingCharacters } from "../../signals/game";
import { useFormatedPlayerlist } from "./hooks/useFormatedPlayerlist";
import { target } from "../../signals/actions";

export type IPlayerListProps = {
  playerList: IPublicPlayer[];
};

export const PlayerList: FC<IPlayerListProps> = ({ playerList }) => {
  // const [target, setTarget] = useState<Index>(None);

  /** 这里players第一个被认为书 empty item，会被丢弃 */
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
