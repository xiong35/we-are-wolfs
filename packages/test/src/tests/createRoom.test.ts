import { config6 } from "../configs/6";
import { classname } from "../utils/puppeteerEnhancer/classname";
import { getTextContent } from "../utils/puppeteerEnhancer/getTextContent";
import { createRoom } from "../utils/werewolfLogic/createRoom";
import { getPages } from "../utils/werewolfLogic/getPages";
import { startMasterPlayer } from "../utils/werewolfLogic/startMasterPlayer";
import { startNormalPlayer } from "../utils/werewolfLogic/startNormalPlayer";

const config = config6;

test("Create Room", async () => {
  const { pages, browsers, firstPage, restPages } = await createRoom(config);

  const text = await getTextContent(firstPage, classname("game-status"), true);
  expect(text).toBe("WOLF_KILL");

  browsers.forEach((b) => b.close());
}, 100000000);
