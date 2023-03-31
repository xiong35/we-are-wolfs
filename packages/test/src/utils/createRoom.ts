import { Config } from "../configs";
import { getPages } from "./getPages";
import { startMasterPlayer } from "./startMasterPlayer";
import { startNormalPlayer } from "./startNormalPlayer";

export async function createRoom(config: Config) {
  const { pages, browsers } = await getPages(config);

  const [firstPage, ...restPages] = pages;

  await startMasterPlayer(firstPage, config);

  for (const p of restPages) {
    await startNormalPlayer(p, config);
  }

  await firstPage.waitForSelector(".w-start");
  await firstPage.click(".w-start");

  return { pages, browsers, firstPage, restPages };
}
