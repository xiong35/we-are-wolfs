import { Page } from "puppeteer";

export async function getTextContent(
  page: Page,
  selector: string,
  wait = false
) {
  if (wait) await page.waitForSelector(selector);

  return await (
    await (await page.$(selector))?.getProperty?.("textContent")
  )?.jsonValue?.();
}
