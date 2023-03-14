import { ESetableCharacters } from "@werewolf/shared";
import { log } from "@werewolf/shared";
import sha256 from "sha256";
import { showDialog } from "../../../signals/dialog";

export async function createRoom(
  nickname: string,
  password: string,
  characters: Record<ESetableCharacters, number>
) {
  if (!nickname) return showDialog("请填写昵称");

  /* 设置人数配置
   * 将 Record<ESetableCharacters, number> 转化成 ESetableCharacters[]
   * record中有多少个角色，数组中就有多少个该角色
   */
  let characterNames: ESetableCharacters[] = [];
  (Object.keys(characters) as ESetableCharacters[]).map((name) => {
    characterNames = characterNames.concat(
      new Array(characters[name]).fill(name)
    );
  });
  // FIXME：设置 needingCharacters（主要用于等待房间的格子数，或许前端不用设置，可以等后端统一发回来？）
  // needingCharacters.value = characterNames;

  // TODO：发送请求
  // const res = await createRoom({
  //   characters: characterNames,
  //   name: nickname,
  //   password: password ? sha256(password) : undefined,
  // });

  // if (res && res.status === 200) {
  //   const data = res.data;
  //   /* 通知后端, 在 io 中加入该房间 */
  //   joinRoom(data.roomNumber);

  //   showDialog("创建成功, 进入等待房间");
  //   router.push({
  //     name: "waitRoom",
  //     query: {
  //       pw: password.value,
  //       number: data.roomNumber,
  //     },
  //   });
  //   setToken(data.id, data.roomNumber);
  //   players.value = [
  //     {
  //       index: 1,
  //       isAlive: true,
  //       name: nickname.value,
  //       isSheriff: false,
  //       isDying: false,
  //       hasVotedAt: [],
  //       sheriffVotes: [],
  //     },
  //   ];
  // }

  log({ nickname, password, characters });
}
