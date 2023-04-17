import { Page } from "puppeteer";

export async function fillPassword(page: Page, password: string) {
  if (!password) return;
  await page.type("[class^='_password'] input", password);
}
