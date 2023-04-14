/** 房主启动 */

import { ESetableCharacters } from "@werewolf/shared";
import { Page } from "puppeteer";
import { Config } from "../configs/index";
import { fillPassword } from "./fillPassword";
import { setPlayerNum } from "./setPlayerNum";
import { sleep } from "./sleep";

export async function startMasterPlayer(page: Page, config: Config) {
  console.log("# startMasterPlayer");

  await page.goto("http://localhost:3000/createRoom");

  const { needingCharacters, password } = config;

  console.log("# startMasterPlayer", needingCharacters, password);

  await setPlayerNum(page, config);
  await page.type("[class^='_name'] input", "Player 1");
  await fillPassword(page, config.password);

  await sleep(1000);

  await page.click(".w-create");
}
