import { Config } from "./configs";
import { config6 } from "./configs/6";
import { getPages } from "./utils/getPages";
import { startMasterPlayer } from "./utils/startMasterPlayer";

async function main(config: Config) {
  const { pages, browsers } = await getPages({
    needingCharacters: { GUARD: 1 },
  } as any);

  const [firstPage, ...restPages] = pages;

  startMasterPlayer(firstPage, config);
}

main(config6);
