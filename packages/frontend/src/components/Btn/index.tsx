import "./index.less";
import { FC } from "react";
import { UseBorder } from "../UseBorder";
import classNames from "classnames";

export type IBtnProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const Btn: FC<IBtnProps> = ({
  children,
  disabled,
  onClick,
  className,
  ...rest
}) => {
  return (
    <UseBorder
      onClick={onClick}
      className={classNames("w-btn", { disabled }, className)}
      {...rest}
    >
      {children}
    </UseBorder>
  );
};
