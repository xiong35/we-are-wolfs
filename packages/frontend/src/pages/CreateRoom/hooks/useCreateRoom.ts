import { ESetableCharacters } from "@werewolf/shared";
import { useNavigate } from "react-router-dom";
import sha256 from "sha256";
import { createRoomReq } from "../../../api/http/room";
import { PASSWORD, ROOM_NUMBER } from "../../../constants/searchPrams";
import { showDialog } from "../../../signals/dialog";
import { setToken } from "../../../utils/token";

export function useCreateRoom() {
  const navigate = useNavigate();

  async function createRoom(
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

    const res = await createRoomReq({
      characters: characterNames,
      password: password ? sha256(password) : undefined,
      creatorName: nickname,
    });

    if (!res) return showDialog("创建房间失败");

    const { id, roomNumber } = res;

    showDialog("创建成功, 进入等待房间");
    setToken(id, roomNumber);

    navigate({
      pathname: "/waitRoom",
      search: `?${PASSWORD}=${password}&${ROOM_NUMBER}=${roomNumber}`,
    });
  }

  return createRoom;
}
