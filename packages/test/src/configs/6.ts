import { Config } from "./index";

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
  events: [
    {
      from: 5,
      target: 1,
      actionName: "狼人杀人",
      stage: "WOLF_KILL",
    },
    {
      from: 3,
      target: 1,
      actionName: "预言家验人",
      stage: "SEER_CHECK",
    },
    {
      from: 6,
      target: 2,
      actionName: "使用毒药",
      stage: "WITCH_ACT",
    },
    {
      from: 1,
      target: 2,
      actionName: "保护一名玩家",
      stage: "GUARD_PROTECT",
    },
  ],
};
