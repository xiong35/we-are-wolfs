import { Page } from "puppeteer";
import { getTextContent } from "./getTextContent";
import { sleep } from "./sleep";

export async function waitForText(
  page: Page,
  targetText: string,
  selector: string
) {
  while (1) {
    const actualText = await getTextContent(page, selector);
    if (actualText === targetText) {
      break;
    } else {
      await sleep(700);
    }
  }
}
