import styles from "./index.module.less";
import { FC } from "react";

export type INoMatchProps = {};

const NoMatch: FC<INoMatchProps> = (props) => {
  return <div className={styles["w-no-match"]}>404</div>;
};

export default NoMatch;
