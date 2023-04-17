import { config6 } from "../configs/6";
import { classname } from "../utils/puppeteerEnhancer/classname";
import { createRoom } from "../utils/werewolfLogic/createRoom";
import { getPages } from "../utils/werewolfLogic/getPages";
import { runEvent } from "../utils/werewolfLogic/runEvent";
import { sleep } from "../utils/puppeteerEnhancer/sleep";
import { startMasterPlayer } from "../utils/werewolfLogic/startMasterPlayer";
import { startNormalPlayer } from "../utils/werewolfLogic/startNormalPlayer";
import { getTextContent } from "../utils/puppeteerEnhancer/getTextContent";

const config = config6;

test("act", async () => {
  const { pages, browsers, firstPage, restPages } = await createRoom(config);

  const text = await getTextContent(firstPage, classname("game-status"), true);
  expect(text).toBe("WOLF_KILL");

  for (const e of config.events || []) {
    const playerPage = pages[e.from - 1];
    console.log("# act", "playerPage", e);
    await runEvent(playerPage, e);
  }

  await sleep(100000000);
  // browsers.forEach((b) => b.close());
}, 100000000);
