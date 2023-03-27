import styles from "./index.module.less";
import { FC } from "react";

export type ICharacterInfoProps = {};

export const CharacterInfo: FC<ICharacterInfoProps> = (props) => {
  return <div className={styles["w-character_info"]}>character_info</div>;
};
