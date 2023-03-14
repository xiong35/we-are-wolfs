import { IJoinRoomReq } from "@werewolf/shared";
import sha256 from "sha256";
import { showDialog } from "../../../signals/dialog";

export async function joinRoom(form: IJoinRoomReq) {
  const { name, roomNumber, password } = form
  if (!roomNumber) return showDialog("请填写房间号");
  if (!name) return showDialog("请填写昵称");

  // TODO: 真实请求
  // const res = await joinRoom({
  //   ...form,
  //   password: password ? sha256(password) : undefined,
  // });

  // if (res && res.status === 200) {
  //   /* 向后端 socket 注册加入房间 */
  //   joinRoomSocket(roomNumber.value);

  //   showDialog("成功加入房间!");
  //   needingCharacters.value = res.data.needingCharacters;
  //   router.push({
  //     name: "waitRoom",
  //     query: {
  //       pw: password.value,
  //       number: roomNumber.value,
  //     },
  //   });

  //   setToken(res.data.id, roomNumber.value);
  // }
}

// export function gameBegin() {
//   /* 清空以前的备忘录 */
//   localStorage.removeItem("memo");
//   showDialog("游戏开始, 天黑请闭眼👁️");
//   setTimeout(() => {
//     router.push({
//       name: "play",
//     });
//   }, 500);
// }
