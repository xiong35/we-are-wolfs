import { config6 } from "../configs/6";
import { classname } from "../utils/classname";
import { createRoom } from "../utils/createRoom";
import { getPages } from "../utils/getPages";
import { runEvent } from "../utils/runEvent";
import { sleep } from "../utils/sleep";
import { startMasterPlayer } from "../utils/startMasterPlayer";
import { startNormalPlayer } from "../utils/startNormalPlayer";

const config = config6;

test("act", async () => {
  const { pages, browsers, firstPage, restPages } = await createRoom(config);

  const selector = await firstPage.waitForSelector(classname("game-status"));
  const text = await selector.evaluate((node) => node.textContent);
  expect(text).toBe("WOLF_KILL");

  for (const e of config.events || []) {
    const playerPage = pages[e.from - 1];
    console.log("# act", "playerPage", e);
    await runEvent(playerPage, e);
  }

  await sleep(100000000);
  // browsers.forEach((b) => b.close());
}, 100000000);
