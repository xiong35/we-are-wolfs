import { FC } from "react";
import { UseBorder } from "../UseBorder";
import "./index.less";

import { ReactComponent as SVGClose } from "../../assets/close.svg";
import classNames from "classnames";

export type IUseMenuProps = {
  onCancel: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const UseMenu: FC<IUseMenuProps> = ({ children, onCancel, ...rest }) => {
  return (
    <div {...rest} className={classNames("w-use_menu", rest.className)}>
      <UseBorder>
        {children}
        <SVGClose onClick={onCancel} className="cancel" />
      </UseBorder>
    </div>
  );
};
