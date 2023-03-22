import { ECharacter, ESetableCharacters } from "@werewolf/shared";

export type Config = {
  needingCharacters: Record<ESetableCharacters, number>;
  password?: string;
  roomNumber: string;
};
