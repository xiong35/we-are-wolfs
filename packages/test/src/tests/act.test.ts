import { config6 } from "../configs/6";
import { classname } from "../utils/classname";
import { createRoom } from "../utils/createRoom";
import { getPages } from "../utils/getPages";
import { runEvent } from "../utils/runEvent";
import { startMasterPlayer } from "../utils/startMasterPlayer";
import { startNormalPlayer } from "../utils/startNormalPlayer";

const config = config6;

test("act", async () => {
  const { pages, browsers, firstPage, restPages } = await createRoom(config);

  const selector = await firstPage.waitForSelector(classname("game-status"));
  const text = await selector.evaluate((node) => node.textContent);
  expect(text).toBe("WOLF_KILL");

  for (const e of config.events || []) {
    await runEvent(pages[e.from - 1], e);
  }

  // browsers.forEach((b) => b.close());
}, 100000000);
