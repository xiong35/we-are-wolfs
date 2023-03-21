import { CLIENT_BASE_URL } from "@werewolf/shared";
import puppeteer from "puppeteer";
import { Config } from "../configs";
import { sumPlayers } from "./sumPlayers";

export function getPages(config: Config) {
  const playerNum = sumPlayers(config);

  return new Array({ length: playerNum }).fill(undefined).map(async (_, i) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(CLIENT_BASE_URL);

    await page.setViewport({ width: 450, height: 800 });

    return page;
  });
}
