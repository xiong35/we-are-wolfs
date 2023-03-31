import styles from "./index.module.less";
import { FC } from "react";
import {
  act,
  getIsActing,
  noTarget,
  setIsActing,
} from "../../../../signals/actions";
import { ReactComponent as SVGClose } from "../../../../assets/close.svg";
import { ReactComponent as SVGChecked } from "../../../../assets/checked.svg";

export type IBottomActionsProps = {};

export const BottomActions: FC<IBottomActionsProps> = (props) => {
  const isActing = getIsActing();
  return (
    <div className={styles["w-bottom_actions"]}>
      {isActing && (
        <div className={styles["bottom_actions"]}>
          <SVGClose onClick={() => setIsActing(false)} />

          <div>
            <div>
              <span>{noTarget.value ? "是否确认" : "选择目标"}</span>
            </div>
            <div>
              <small style={{ opacity: 0.6 }}>不选即为放弃</small>
            </div>
          </div>

          <SVGChecked onClick={act} />
        </div>
      )}

      <div className={styles["bottom_actions-holder"]}></div>
    </div>
  );
};
