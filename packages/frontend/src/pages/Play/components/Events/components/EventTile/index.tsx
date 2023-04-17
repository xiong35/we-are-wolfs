import styles from "./index.module.less";
import { FC } from "react";
import { Avatar } from "../../../../../../components/Avatar";
import { Day, ECharacter } from "@werewolf/shared";

export type IEventTileProps = {
  character: ECharacter;
  deed: string;
  at: Day;
};

import { ReactComponent as SVGMoon } from "../../../../../../assets/moon.svg";
import { ReactComponent as SVGSun } from "../../../../../../assets/sun.svg";

export const EventTile: FC<IEventTileProps> = ({ at, character, deed }) => {
  return (
    <div className={styles["w-event_tile"]}>
      <div className={styles["left-info"]}>
        <Avatar character={character} />
        {at % 2 === 0 ? (
          <SVGMoon className={styles["isDay"]} />
        ) : (
          <SVGSun className={styles["isDay"]} />
        )}
      </div>
      <pre className={styles["deed"]}>{deed}</pre>
    </div>
  );
};
