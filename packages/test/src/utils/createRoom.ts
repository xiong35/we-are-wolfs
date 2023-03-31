import { Config } from "../configs";
import { getPages } from "./getPages";
import { sleep } from "./sleep";
import { startMasterPlayer } from "./startMasterPlayer";
import { startNormalPlayer } from "./startNormalPlayer";

export async function createRoom(config: Config) {
  const { pages, browsers } = await getPages(config);

  const [firstPage, ...restPages] = pages;

  await startMasterPlayer(firstPage, config);

  for (const p of restPages) {
    await startNormalPlayer(p, config);
  }

  const startBtn = await firstPage.waitForSelector(".w-start:not(.disabled)");
  console.log("# createRoom", "startBtn got");
  await sleep(500);
  await startBtn.click();

  return { pages, browsers, firstPage, restPages };
}
