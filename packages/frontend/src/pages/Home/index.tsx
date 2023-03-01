import styles from "./index.module.less";
import { FC } from "react";

import { ReactComponent as SVGLogo } from "../../assets/werewolf.svg";
import { Btn } from "../../components/Btn";
import { useNavigate } from "react-router-dom";

export type IHomeProps = {};

const Home: FC<IHomeProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <SVGLogo className={styles["w-home-logo"]}></SVGLogo>

      <div className={styles["w-home-title"]}>狼人杀</div>

      <div className={styles["w-home-btns"]}>
        <Btn onClick={() => navigate("joinRoom")}>加入房间</Btn>
        <Btn onClick={() => navigate("createRoom")}>创建房间</Btn>
        <Btn onClick={() => navigate("review")}>游戏记录</Btn>
      </div>
    </div>
  );
};

export default Home;
