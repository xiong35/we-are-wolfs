import styles from "./index.module.less";
import { FC } from "react";
import { UseMenu } from "../../../../components/UseMenu";
import { EventList } from "./components/EventList";
import { groupedGameEvents } from "../../../../signals/computeGameEvents";

export type IEventsProps = {
  close: () => void;
};

export const Events: FC<IEventsProps> = ({ close }) => {
  return (
    <UseMenu
      className={styles["w-events"]}
      borderClassName={styles["border"]}
      onCancel={close}
    >
      <div className={styles["title"]}>事件一览</div>
      {groupedGameEvents.value.length > 0 ? (
        <div v-if="groupedGameEvents.length > 0">
          {groupedGameEvents.value.map((events, day) => (
            <EventList
              v-for="(events, day) in groupedGameEvents"
              key={day}
              day={day}
              events={events}
            ></EventList>
          ))}
        </div>
      ) : (
        <div className={styles["placeholder"]} v-else>
          暂无事件
        </div>
      )}
    </UseMenu>
  );
};
