import styles from "./index.module.less";
import { FC, useState } from "react";
import { PlayerList } from "../../components/PlayerList";
import {
  date,
  gameStatus,
  gameStatusTimeLeft,
  players,
  self,
} from "../../signals/game";

import { ReactComponent as SVGMoon } from "../../assets/moon.svg";
import { ReactComponent as SVGSun } from "../../assets/sun.svg";
import { Btn } from "../../components/Btn";
import { CharacterInfo } from "./components/CharacterInfo";
import { ZHGameStatusI18N } from "@werewolf/shared";
import { Actions } from "./components/Actions";
import { BottomActions } from "./components/BottomActions";
import { getIsActing, resetActions, setIsActing } from "../../signals/actions";
import classNames from "classnames";
import { Memo } from "./components/Memo";
import { Events } from "./components/Events";

export type IPlayProps = {};

const Play: FC<IPlayProps> = (props) => {
  const dateVal = date.value;
  const selfVal = self.value;
  console.log({ dateVal, selfVal });

  const [showCharacter, setShowCharacter] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const isActing = getIsActing();

  return (
    <div className={styles["w-play"]}>
      <PlayerList playerList={players.value}></PlayerList>

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
        <Btn disabled={isActing} onClick={() => setShowCharacter(true)}>
          查看角色
        </Btn>
        <Btn disabled={isActing} onClick={() => setShowActions(true)}>
          显示操作
        </Btn>
        <Btn disabled={isActing} onClick={() => setShowMemo(true)}>
          备忘速记
        </Btn>
        <Btn disabled={isActing} onClick={() => setShowEvents(true)}>
          事件记录
        </Btn>

        {showCharacter && (
          <CharacterInfo
            close={() => setShowCharacter(false)}
            character={selfVal.character}
          />
        )}

        {showActions && <Actions close={() => setShowActions(false)}></Actions>}
        {showMemo && <Memo close={() => setShowMemo(false)} />}
        {showEvents && <Events close={() => setShowEvents(false)} />}
      </div>

      <BottomActions />
    </div>
  );
};

export default Play;
