import styles from "./index.module.less";
import { FC, useState } from "react";
import { Index, IPublicPlayer } from "@werewolf/shared";
import { PlayerListItem } from "./components/PlayerListItem";

export type IPlayerListProps = {
  playerList: IPublicPlayer[];
};

export const PlayerList: FC<IPlayerListProps> = ({ playerList }) => {
  const [target, setTarget] = useState<Index>(-1);
  return (
    <div className={styles["w-player_list"]}>
      {playerList.map((item) => (
        <PlayerListItem
          isEmpty={false}
          target={target}
          setTarget={setTarget}
          player={item}
        ></PlayerListItem>
      ))}
    </div>
  );
};
