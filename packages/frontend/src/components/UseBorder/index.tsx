import "./index.less";
import { FC } from "react";

export type UseBorderProps = {
  children: React.ReactNode;
};

export const UseBorder: FC<UseBorderProps> = (props) => {
  return (
    <span className="use-border">
      {props.children}
      <div className="use-border-mask"></div>
    </span>
  );
};
