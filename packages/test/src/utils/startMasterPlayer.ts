/** 房主启动 */

import { ESetableCharacters } from "@werewolf/shared";
import { Page } from "puppeteer";
import { Config } from "../configs/index";
import { fillPassword } from "./fillPassword";
import { setPlayerNum } from "./setPlayerNum";

export async function startMasterPlayer(page: Page, config: Config) {
  console.log("# startMasterPlayer");

  await page.goto("http://localhost:3000/createRoom");

  const { needingCharacters, password } = config;

  console.log("# startMasterPlayer", needingCharacters, password);

  // Object.keys(needingCharacters).map(async (key) => {
  //   const num = needingCharacters[key as ESetableCharacters];
  //   console.log("# startMasterPlayer", key, num);

  //   const leftSelector = `.w-character_tile.${key} [class^="_down"]`;
  //   await page.waitForSelector(leftSelector);

  //   console.log("# startMasterPlayer", key, "selected");

  //   await page.click(leftSelector);
  //   console.log("# startMasterPlayer", key, "clicked");
  // });
  await setPlayerNum(page, config);
  await page.type("[class^='_name'] input", "Player 1");
  await fillPassword(page, "password");

  await page.click(".w-create");
}
