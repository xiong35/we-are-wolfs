import {
  ECharacter,
  EGameStatus,
  ESetableCharacters,
  Index,
} from "@werewolf/shared";

export type Config = {
  needingCharacters: Record<ESetableCharacters, number>;
  password?: string;
  roomNumber: string;
  events?: Event[];
};

export type Event = {
  from: Index;
  target: Index;
  actionName: string;
  stage: EGameStatus;
};
