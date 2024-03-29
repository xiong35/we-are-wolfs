import { None } from "@werewolf/shared";
import { Page } from "puppeteer";
import { Event } from "../../configs";
import { classname } from "../puppeteerEnhancer/classname";
import { sleep } from "../puppeteerEnhancer/sleep";
import { waitForText } from "../puppeteerEnhancer/waitForText";

const actionSelector = classname("_actions_") + " > .w-btn:nth-child(2)";
const confirmSVGSelector =
  classname("_bottom_actions_") + " > svg:nth-child(3)";

export async function runEvent(page: Page, event: Event) {
  await waitForText(page, event.stage, classname("_game-status"));

  console.log("# runEvent", "entered", event.stage);

  const actionBtn = await page.waitForSelector(actionSelector);
  await actionBtn.click();

  const actionDetailBtn = await page.waitForSelector(
    `text/${event.actionName}`
  );
  await actionDetailBtn.click();

  if (event.target !== None) {
    const targetNum = await page.waitForSelector(`text/${event.target}`);
    await targetNum.click();
  }

  const confirmSVG = await page.waitForSelector(confirmSVGSelector);
  await confirmSVG.click();

  console.log("# runEvent", "finish", event.stage);
}
