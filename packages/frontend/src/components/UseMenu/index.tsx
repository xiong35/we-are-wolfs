import { FC } from "react";
import { UseBorder } from "../UseBorder";
import "./index.less";

import { ReactComponent as SVGClose } from "../../assets/close.svg";

export type IUseMenuProps = {
  onCancel: () => void;
  children: React.ReactNode;
};

export const UseMenu: FC<IUseMenuProps> = (props) => {
  return (
    <div className="use-menu">
      <UseBorder>
        {props.children}
        <SVGClose onClick={props.onCancel} className="cancel" />
      </UseBorder>
    </div>
  );
};
