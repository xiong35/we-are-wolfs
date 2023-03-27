import styles from "./index.module.less";
import { FC, useState } from "react";
import { PlayerList } from "../../components/PlayerList";
import { getMockPlayers } from "@werewolf/mock";
import { date, gameStatus, gameStatusTimeLeft } from "../../signals/game";

import { ReactComponent as SVGMoon } from "../../assets/moon.svg";
import { ReactComponent as SVGSun } from "../../assets/sun.svg";
import { Btn } from "../../components/Btn";
import { CharacterInfo } from "./components/CharacterInfo";
import { ZHGameStatusI18N } from "@werewolf/shared";

export type IPlayProps = {};

const Play: FC<IPlayProps> = (props) => {
  const dateVal = date.value;

  const [showCharacter, setShowCharacter] = useState(false);

  return (
    <div className={styles["w-play"]}>
      <PlayerList playerList={getMockPlayers(7)}></PlayerList>

      <div className={styles["date"]}>
        Day {Math.ceil(dateVal / 2)}
        {dateVal % 2 === 0 ? (
          <SVGMoon className={styles["date-icon"]} />
        ) : (
          <SVGSun className={styles["date-icon"]} />
        )}
      </div>

      <div className={styles["game-status"]}>
        {ZHGameStatusI18N[gameStatus.value]}
      </div>
      <div className={styles["game-status"]}>
        剩余时间：
        {gameStatusTimeLeft.value < 0 ? "---" : gameStatusTimeLeft.value + "S"}
      </div>

      <div className={styles["actions"]}>
        <Btn /* disabled="isActing"  */ onClick={() => setShowCharacter(true)}>
          查看角色
        </Btn>
        {/* <Btn
          disabled="isActing"
          onClick="showActions = true"
          className="{ active: canAct }"
          content="显示操作"
        ></Btn>
        <Btn
          disabled="isActing"
          onClick="showMemo = true"
          content="备忘速记"
        ></Btn>
        <Btn
          disabled="isActing"
          onClick="showEvents = true"
          content="事件记录"
        ></Btn> */}

        {showCharacter && <CharacterInfo />}
        {/* <Actions></Actions>
        <Memo></Memo>
        <Events></Events> */}
      </div>

      {/* <BottomActions></BottomActions> */}
    </div>
  );
};

export default Play;
