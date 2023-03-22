import { Config } from "./configs";
import { config6 } from "./configs/6";
import { getPages } from "./utils/getPages";
import { startMasterPlayer } from "./utils/startMasterPlayer";
import { startNormalPlayer } from "./utils/startNormalPlayer";

async function main(config: Config) {
  const { pages, browsers } = await getPages(config6);

  const [firstPage, ...restPages] = pages;

  await startMasterPlayer(firstPage, config);

  for (const p of restPages) {
    await startNormalPlayer(p, config);
  }

  await firstPage.waitForSelector(".w-start");
  await firstPage.click(".w-start");
}

main(config6);
