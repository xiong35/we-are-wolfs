import { None } from "@werewolf/shared";
import { Config, Event } from "./index";
import { batchEndDaySpeach, batchVote } from "./utils";

/**
 * 1 - "GUARD",
 * 2 - "HUNTER",
 * 3 - "SEER",
 * 4 - "VILLAGER",
 * 5 - "WEREWOLF",
 * 6 - "WITCH"
 */

const basicNightEvents: Event[] = [
  {
    from: 5,
    target: 1,
    actionName: "狼人杀人", // 狼人杀守卫
    stage: "WOLF_KILL",
  },
  {
    from: 3,
    target: 5,
    actionName: "查验身份", // 预言家验狼人
    stage: "SEER_CHECK",
  },
  {
    from: 6,
    target: 2,
    actionName: "使用毒药", // 女巫毒杀猎人（猎人无法开枪）
    stage: "WITCH_ACT",
  },
  {
    from: 1,
    target: 2,
    actionName: "保护一名玩家", // 守卫保护猎人（无法护住毒杀）
    stage: "GUARD_PROTECT",
  },
];

const dayEvents: Event[] = [
  ...basicNightEvents,
  {
    from: 1,
    target: None,
    actionName: "结束发言",
    stage: "LEAVE_MSG",
  },
  {
    from: 2,
    target: None,
    actionName: "结束发言",
    stage: "LEAVE_MSG",
  },
  ...batchEndDaySpeach([3, 4, 5, 6]),
  ...batchVote(
    [
      [3, 4],
      [4, 3],
      [5, 4],
      [6, 4],
    ],
    "EXILE_VOTE",
    "票选狼人"
  ),
  {
    from: 4,
    target: None,
    actionName: "结束发言",
    stage: "LEAVE_MSG",
  },
];

export const config6: Config = {
  needingCharacters: {
    GUARD: 1,
    HUNTER: 1,
    SEER: 1,
    VILLAGER: 1,
    WEREWOLF: 1,
    WITCH: 1,
  },
  roomNumber: "666666",
  events: dayEvents,
};
