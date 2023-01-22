import "./index.less";
import { FC } from "react";

export type UseBorderProps = {
  children: React.ReactNode;
};

export const UseBorder: FC<UseBorderProps> = (props) => {
  return (
    <span className="w-use-border">
      {props.children}
      <div className="w-use-border-mask"></div>
    </span>
  );
};
