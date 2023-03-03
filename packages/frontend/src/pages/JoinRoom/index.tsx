import styles from "./index.module.less";
import { FC } from "react";
import { UseBorder } from "../../components/UseBorder";
import { Btn } from "../../components/Btn";
import { useQueryInfo } from "./hooks/useQueryInfo";
import { useForm } from "./hooks/useForm";
import { joinRoom } from "./methods/joinRoom";

export type IJoinRoomProps = {};

const JoinRoom: FC<IJoinRoomProps> = (props) => {
  const { initialPassword, initialRoomNumber } = useQueryInfo();
  const { form, setField } = useForm(initialPassword, initialRoomNumber);

  return (
    <div className={styles["w-join_room"]}>
      <div className={styles["title"]}>加入房间</div>
      <div className={styles["number"]}>
        <span className={styles["hint"]}>房号：</span>
        <UseBorder>
          <input
            maxLength={6}
            type="text"
            onChange={(e) => setField("roomNumber", e.target.value)}
            value={form.roomNumber}
          />
        </UseBorder>
      </div>
      <div className={styles["pw"]}>
        <span className={styles["hint"]}>密码：</span>
        <UseBorder>
          <input
            maxLength={20}
            type="text"
            placeholder="(可选)"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
          />
        </UseBorder>
      </div>
      <div className={styles["name"]}>
        <span className={styles["hint"]}>昵称：</span>
        <UseBorder>
          <input
            onChange={(e) => setField("name", e.target.value)}
            value={form.name}
            maxLength={8}
            type="text"
            placeholder=""
          />
        </UseBorder>
      </div>

      <div className={styles["spacer"]}></div>

      <Btn onClick={() => joinRoom(form)}>确认加入</Btn>
    </div>
  );
};

export default JoinRoom;
