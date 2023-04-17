import { EGameStatus, Index, None } from "@werewolf/shared";
import { Event } from "./index";

export function batchEndDaySpeach(indexes: Index[]): Event[] {
  return indexes.map<Event>((i) => ({
    from: i,
    target: None,
    actionName: "结束发言",
    stage: "DAY_DISCUSS",
  }));
}

/**
 * @param votes [from, target][]
 */
export function batchVote(
  votes: [Index, Index][],
  stage: EGameStatus,
  actionName: string
): Event[] {
  return votes.map<Event>(([from, target]) => ({
    from,
    target,
    actionName,
    stage,
  }));
}
