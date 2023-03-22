import { CLIENT_BASE_URL } from "@werewolf/shared";
import puppeteer, { Page, Browser } from "puppeteer";
import { Config } from "../configs/index";
import { sumPlayers } from "./sumPlayers";

export async function getPages(config: Config) {
  const playerNum = sumPlayers(config);
  console.log(" getPage", config, playerNum);

  const pages: Page[] = [];
  const browsers: Browser[] = [];

  for (let i = 0; i < playerNum; i++) {
    console.log(" getPage - launching:", i + 1);
    const browser = await puppeteer.launch({ headless: false });
    console.log(" getPage - launched:", i + 1);

    const page = await browser.newPage();

    await page.goto(CLIENT_BASE_URL);

    await page.setViewport({ width: 450, height: 800 });

    pages.push(page);
    browsers.push(browser);
  }

  return { pages, browsers };
}
