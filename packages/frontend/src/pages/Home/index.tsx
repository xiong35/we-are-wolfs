import styles from "./index.module.less";
import { FC } from "react";

export type IHomeProps = {};

const Home: FC<IHomeProps> = (props) => {
  return <div className={styles["w-home"]}>home</div>;
};

export default Home;
