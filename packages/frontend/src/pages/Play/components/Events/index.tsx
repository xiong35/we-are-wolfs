import styles from "./index.module.less";
import { FC } from "react";
import { UseMenu } from "../../../../components/UseMenu";

export type IEventsProps = {
  close: () => void;
};

export const Events: FC<IEventsProps> = ({ close }) => {
  return (
    <UseMenu
      className={styles["w-events"]}
      onCancel={close}
    >
      <div className={styles["title"]}>事件一览</div>
      {/* <div v-if="groupedGameEvents.length > 0">
        <EventList
          v-for="(events, day) in groupedGameEvents"
          key="day"
          day="day"
          events="events"
        ></EventList>
      </div>
      <div className={styles["placeholder"]} v-else>
        暂无事件
      </div> */}
    </UseMenu>
  );
};
