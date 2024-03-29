import { IJoinRoomReq } from "@werewolf/shared";
import sha256 from "sha256";
import { joinRoomReq } from "../../../api/http/room";
import { showDialog } from "../../../signals/dialog";

import { useNavigate } from "react-router-dom";
import { setToken } from "../../../utils/token";
import { PASSWORD, ROOM_NUMBER } from "../../../constants/searchPrams";
import { self } from "../../../signals/game";

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

    const { id, index } = res;

    self.value = { ...self.peek(), id, index };
    showDialog("成功加入房间!");
    setToken(res.id, roomNumber);

    navigate({
      pathname: "/waitRoom",
      search: `?${PASSWORD}=${password}&${ROOM_NUMBER}=${roomNumber}`,
    });
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
