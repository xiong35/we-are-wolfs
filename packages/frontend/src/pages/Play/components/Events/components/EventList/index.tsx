import styles from "./index.module.less";
import { FC } from "react";
import { EventTile } from "../EventTile";
import { Day, IGameEvent } from "@werewolf/shared";

export type IEventListProps = {
  events: IGameEvent[];
  day: Day;
};

export const EventList: FC<IEventListProps> = ({ day, events }) => {
  return (
    <div className={styles["w-event_list"]}>
      <div className={styles["event-day"]}>Day {day}</div>
      {events.map((e) => {
        return (
          <EventTile
            key={e.at + e.deed}
            character={e.character}
            deed={e.deed}
            at={e.at}
          ></EventTile>
        );
      })}
    </div>
  );
};
