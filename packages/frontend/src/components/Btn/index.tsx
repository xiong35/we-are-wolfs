import "./index.less";
import { FC } from "react";
import { UseBorder } from "../UseBorder";
import classNames from "classnames";

export type IBtnProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const Btn: FC<IBtnProps> = ({ children, disabled, onClick }) => {
  return (
    <UseBorder onClick={onClick} className={classNames("w-btn", { disabled })}>
      {children}
    </UseBorder>
  );
};
