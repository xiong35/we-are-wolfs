import { Config } from "../configs";
import { Page } from "puppeteer";
import { ESetableCharacters } from "@werewolf/shared";
import { sleep } from "./sleep";

export async function setPlayerNum(page: Page, config: Config) {
  console.log("# setPlayerNum");

  // 先全部减到最小，再一个一个加回去
  await page.waitForSelector(".w-character_tile");

  const { needingCharacters, password } = config;

  for (const key in needingCharacters) {
    const targetNum = needingCharacters[key as ESetableCharacters].toString();

    const t = await page.$(`.w-character_tile.${key}`);
    console.log(`# setPlayerNum - ${key}`, targetNum);

    await page.waitForSelector("[class^='_down']");
    const down = await t.$("[class^='_down']");
    const up = await t.$("[class^='_up']");

    for (let i = 0; i < 5; i++) {
      await down.click();
    }


    let i = 10;
    while (--i) {
      const numSelector = await t.waitForSelector("[class^='_number']");
      const num = await numSelector?.evaluate((el) => el.textContent);

      if (num !== targetNum) {
        await up.click();
      } else {
        break;
      }
    }

    if (i <= 5) {
      throw new Error(`# setPlayerNum - ${key} - ${i} - ${targetNum}`);
    }
  }
}
