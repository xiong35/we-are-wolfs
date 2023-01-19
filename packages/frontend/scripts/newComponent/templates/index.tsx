import styles from "./index.module.less";
import { FC } from "react";

export type COMPONENT_NAMEProps = {
  children: React.ReactNode;
};

export const COMPONENT_NAME: FC<COMPONENT_NAMEProps> = (props) => {
  return <div className={styles.COMPONENT_NAME}></div>;
};
