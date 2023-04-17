import "./index.less";
import { FC } from "react";
import { UseMenu } from "../UseMenu";
import {
  currentContent,
  dialogTimeLeft,
  hideDialog,
} from "../../signals/dialog";
import { IS_DEV } from "@werewolf/shared";

export const Dialog: FC = () => {
  if (dialogTimeLeft.value <= 0) return null;

  return (
    <UseMenu
      borderClassName="w-dialog-main"
      className={"w-dialog"}
      onCancel={hideDialog}
      style={IS_DEV ? { pointerEvents: "none" } : undefined}
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
