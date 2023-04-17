import { Page } from "puppeteer";
import { Config } from "../../configs";
import { fillPassword } from "./fillPassword";
import { faker } from "@faker-js/faker";

export async function startNormalPlayer(page: Page, config: Config) {
  await page.goto("http://localhost:3000/joinRoom");

  await page.waitForSelector('[class^="_name"]');

  const name = faker.word.noun();

  console.log("# startNormalPlayer", name);

  await fillPassword(page, config.password);
  await page.type('[class^="_name"] input', name);
  await page.type('[class^="_number"] input', config.roomNumber);

  await page.click(".w-confirm");
}
