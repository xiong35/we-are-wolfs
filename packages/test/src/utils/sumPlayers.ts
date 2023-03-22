import { Config } from "../configs/index";

export function sumPlayers(config: Config) {
  return Object.values(config.needingCharacters).reduce((a, b) => a + b);
}
