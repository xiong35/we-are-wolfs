import { config6 } from "../configs/6";
import { getPages } from "../utils/getPages";
import { startMasterPlayer } from "../utils/startMasterPlayer";
import { startNormalPlayer } from "../utils/startNormalPlayer";

const config = config6;

test("Create Room", async () => {
  const { pages, browsers } = await getPages(config);

  const [firstPage, ...restPages] = pages;

  await startMasterPlayer(firstPage, config);

  for (const p of restPages) {
    await startNormalPlayer(p, config);
  }

  await firstPage.waitForSelector(".w-start");
  await firstPage.click(".w-start");

  const selector = await firstPage.waitForSelector('[class^="_game-status"]');
  const text = await selector.evaluate((node) => node.textContent);

  expect(text).toBe("狼人杀人");

  browsers.forEach((b) => b.close());
}, 100000000);
