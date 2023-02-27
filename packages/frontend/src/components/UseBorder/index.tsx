import "./index.less";
import { FC } from "react";
import classNames from "classnames";

export type IUseBorderProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const UseBorder: FC<IUseBorderProps> = ({
  children,
  className,
  ...res
}) => {
  return (
    <span className={classNames("w-use_border", className)} {...res}>
      {children}
      <div className="w-use_border-mask"></div>
    </span>
  );
};
