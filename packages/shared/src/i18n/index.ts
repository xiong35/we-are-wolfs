import { ECharacter, EGameStatus } from "../gameTypes/gameMeta";

type I18NGenerator<K extends keyof any> = Record<K, string>;

/** map character to display name */
export type CharacterNameI18N = I18NGenerator<ECharacter>;
/** map character to 介绍 */
export type CharacterDescriptionI18N = I18NGenerator<ECharacter>;
/** map status to display name */
export type GameStatusI18N = I18NGenerator<EGameStatus>;

export * from "./zh"