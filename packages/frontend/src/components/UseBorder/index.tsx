import "./index.less";
import { FC } from "react";
import classNames from "classnames";
import { dialogTimeLeft } from "../../signals/dialog";

export type IUseBorderProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const UseBorder: FC<IUseBorderProps> = ({
  children,
  className,
  ...res
}) => {
  dialogTimeLeft.peek();
  return (
    <span className={classNames("w-use_border", className)} {...res}>
      {children}
      <div className="w-use_border-mask"></div>
    </span>
  );
};
