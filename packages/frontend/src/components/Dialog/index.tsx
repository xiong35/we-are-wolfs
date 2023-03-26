import "./index.less";
import { FC } from "react";
import { UseMenu } from "../UseMenu";
import {
  currentContent,
  dialogTimeLeft,
  hideDialog,
} from "../../signals/dialog";

export const Dialog: FC = () => {
  if (dialogTimeLeft.value <= 0) return null;

  return (
    <UseMenu
      borderClassName="w-dialog-main"
      className={"w-dialog"}
      onCancel={hideDialog}
    >
      <div className="w-dialog-content">
        <span
          className="w-dialog-content-text"
          dangerouslySetInnerHTML={{
            __html: currentContent.value?.content ?? "",
          }}
        ></span>
        <div onClick={hideDialog} className="confirm">
          确认({dialogTimeLeft.value} s)
        </div>
      </div>
    </UseMenu>
  );
};
