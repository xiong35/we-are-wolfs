import styles from "./index.module.less";
import { FC } from "react";
import { UseMenu } from "../../../../components/UseMenu";
import { Avatar } from "../../../../components/Avatar";
import { ECharacter, ZHDescriptionI18N, ZHNames } from "@werewolf/shared";

export type ICharacterInfoProps = {
  close: () => void;
  character: ECharacter;
};

export const CharacterInfo: FC<ICharacterInfoProps> = ({
  close,
  character,
}) => {
  const name = ZHNames[character];
  const intro = ZHDescriptionI18N[character];
  return (
    <UseMenu className={styles["w-character_info"]} onCancel={close}>
      <Avatar character={character} />
      <div className={styles["character"]}>
        你的身份是：<span className={styles["character_name"]}>{name}</span>
      </div>
      <p className={styles["intro"]}>{intro}</p>
    </UseMenu>
  );
};
