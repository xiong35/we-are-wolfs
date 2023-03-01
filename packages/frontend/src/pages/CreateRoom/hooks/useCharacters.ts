import { ESetableCharacters } from "@werewolf/shared";
import { useState } from "react";

export function useCharacters() {
  const [characters, setCharacters] = useState<
    Record<ESetableCharacters, number>
  >({
    GUARD: 1,
    HUNTER: 1,
    SEER: 1,
    VILLAGER: 2,
    WEREWOLF: 3,
    WITCH: 1,
  });

  function setCharacter(c: ESetableCharacters, type: 1 | -1): boolean {
    if (characters[c] + type < 0) return false;
    if (["SEER", "HUNTER", "GUARD", "WITCH"].includes(c)) {
      if (type === 1 && characters[c] === 1) return false;
    }

    if (c === "WEREWOLF" && characters[c] === 1 && type === -1) {
      return false;
    }

    setCharacters({ ...characters, [c]: characters[c] + type });
    return true;
  }

  return { characters, setCharacter };
}
