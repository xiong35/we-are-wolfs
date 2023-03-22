import { Page } from "puppeteer";

export async function fillPassword(page: Page, password: string) {
  await page.type("[class^='_password'] input", password);
}
