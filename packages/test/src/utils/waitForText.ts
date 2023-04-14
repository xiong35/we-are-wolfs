import { Page } from "puppeteer";
import { sleep } from "./sleep";

export async function waitForText(
  page: Page,
  targetText: string,
  selector: string
) {
  while (1) {
    const actualText = await (
      await (await page.$(selector))?.getProperty?.("textContent")
    )?.jsonValue?.();
    if (actualText === targetText) {
      break;
    } else {
      await sleep(700);
    }
  }
}
