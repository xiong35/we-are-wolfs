import { Day } from "./game";
import { ECharacter } from "./gameMeta";

/** 记录每个角色做的事 */
export type ICharacterEvent = {
  character: ECharacter;
  events: {
    at: Day;
    /** 字符串描述所做的事 */
    deed: string;
  }[];
};

/** 记录整局游戏中所有事件 */
export type IGameEvent = {
  character: ECharacter;
  at: Day;
  deed: string;
};
