import styles from "./index.module.less";
import { FC, useState } from "react";
import { Index, IPublicPlayer, None } from "@werewolf/shared";
import { PlayerListItem } from "./components/PlayerListItem";

export type IPlayerListProps = {
  playerList: IPublicPlayer[];
};

export const PlayerList: FC<IPlayerListProps> = ({ playerList }) => {
  const [target, setTarget] = useState<Index>(None);
  return (
    <div className={styles["w-player_list"]}>
      {playerList.map((item) => (
        <PlayerListItem
          key={item.index}
          isEmpty={false}
          target={target}
          setTarget={setTarget}
          player={item}
        ></PlayerListItem>
      ))}
    </div>
  );
};
