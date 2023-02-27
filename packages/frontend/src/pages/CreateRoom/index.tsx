import styles from "./index.module.less";
import { FC } from "react";

export type ICreateRoomProps = {};

const CreateRoom: FC<ICreateRoomProps> = (props) => {
  return <div className={styles["w-create-room"]}>Create room</div>;
};

export default CreateRoom;
