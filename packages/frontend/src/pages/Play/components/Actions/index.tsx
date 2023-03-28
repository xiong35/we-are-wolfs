import styles from "./index.module.less";
import { FC } from "react";
import { UseMenu } from "../../../../components/UseMenu";
import { renderActionList } from "./utils/renderActionList";
import { gameStatus, self } from "../../../../signals/game";

export type IActionsProps = {
  close: () => void;
};

export const Actions: FC<IActionsProps> = ({ close }) => {
  return (
    <UseMenu className={styles["w-actions"]} onCancel={close}>
      <div className={styles["action_list"]}>
        {renderActionList(gameStatus.value, self.value, close)}
      </div>
    </UseMenu>
  );
};
