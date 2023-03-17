import { IJoinRoomReq } from "@werewolf/shared";
import sha256 from "sha256";
import { joinRoomReq } from "../../../api/http/room";
import { setupSocket } from "../../../api/ws/setup";
import { showDialog } from "../../../signals/dialog";
import { needingCharacters } from "../../../signals/game";

import { useNavigate } from "react-router-dom";
import { setToken } from "../../../utils/token";

export function useJoinRoom() {
  const navigate = useNavigate();

  async function joinRoom(form: IJoinRoomReq) {
    const { name, roomNumber, password } = form;
    if (!roomNumber) return showDialog("请填写房间号");
    if (!name) return showDialog("请填写昵称");

    const res = await joinRoomReq({
      ...form,
      password: password ? sha256(password) : undefined,
    });

    if (!res) return showDialog("加入房间失败");

    showDialog("成功加入房间!");
    setupSocket(roomNumber);

    needingCharacters.value = res.needingCharacters;

    navigate({
      pathname: "/waitRoom",
      search: `?pw=${password}&number=${roomNumber}`,
    });

    setToken(res.id, roomNumber);
  }

  return joinRoom;
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
