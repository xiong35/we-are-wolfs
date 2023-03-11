import styles from "./index.module.less";
import { FC } from "react";
import { Btn } from "../../components/Btn";
import { showDialog } from "../../signals/dialog";
import { PlayerList } from "../../components/PlayerList";
import { needingCharacters, players, self } from "../../signals/game";
import { useUrlInfo } from "./hooks/useUrlInfo";
import QRCode from "easyqrcodejs";
import { useQrCode } from "./hooks/useQrCode";

export type IWaitRoomProps = {};

const WaitRoom: FC<IWaitRoomProps> = (props) => {
  const canBegin = needingCharacters.value.length === players.value.length;
  const { qrMountPoint } = useQrCode();
  return (
    <div className={styles["w-wait_room"]}>
      <PlayerList playerList={players.value} />
      <div className={styles["room_number"]}>房间号：{"roomNumber"}</div>

      <div ref={qrMountPoint} className={styles["qr_code"]}></div>

      <div className={styles["actions"]}>
        {self.value.index === 1 && (
          <Btn onClick={() => "gameBegin"} disabled={!canBegin}>
            开始游戏
          </Btn>
        )}

        <Btn onClick={() => showDialog("暂未实现")}>查看规则</Btn>
      </div>
    </div>
  );
};

export default WaitRoom;
