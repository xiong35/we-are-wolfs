import styles from "./index.module.less";
import { FC } from "react";
import { Btn } from "../../components/Btn";
import { showDialog } from "../../signals/dialog";
import { PlayerList } from "../../components/PlayerList";
import { getMockPlayers } from "@werewolf/mock";

export type IWaitRoomProps = {};

const players = getMockPlayers(9);

const WaitRoom: FC<IWaitRoomProps> = (props) => {
  return (
    <div className={styles["w-wait_room"]}>
      <PlayerList playerList={players}></PlayerList>
      <div className={styles["room_number"]}>房间号：{"roomNumber"}</div>

      <div id="w-qr-code"></div>

      <div className={styles["actions"]}>
        <Btn
          onClick={() => "gameBegin"}
          // v-if="self.index === 1"
          className="wait-btn"
          // :disabled="!canBegin"
        >
          开始游戏
        </Btn>
        <Btn className="wait-btn" onClick={() => showDialog("暂未实现")}>
          查看规则
        </Btn>
      </div>
    </div>
  );
};

export default WaitRoom;
