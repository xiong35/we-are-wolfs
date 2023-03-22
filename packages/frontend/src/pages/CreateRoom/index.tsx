import styles from "./index.module.less";
import { FC, useState } from "react";
import { CharacterTile } from "./components/CharacterTile";
import { ESetableCharacters } from "@werewolf/shared";
import { UseBorder } from "../../components/UseBorder";
import { Btn } from "../../components/Btn";
import { useCharacters } from "./hooks/useCharacters";
import { useCreateRoom } from "./hooks/useCreateRoom";

export type ICreateRoomProps = {};

const CreateRoom: FC<ICreateRoomProps> = (props) => {
  const { characters, setCharacter } = useCharacters();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const createRoom = useCreateRoom();

  return (
    <div className={styles["w-create_room"]}>
      <span className={styles["title"]}>角色设置</span>
      <div className={styles["tile-wrapper"]}>
        {(Object.keys(characters) as ESetableCharacters[]).map((c) => (
          <CharacterTile
            key={c}
            character={c}
            num={characters[c]}
            setNum={(num) => setCharacter(c, num)}
          ></CharacterTile>
        ))}
      </div>

      <div className={styles["name"]}>
        <span className={styles["hint"]}>你的昵称：</span>
        <UseBorder>
          <input
            maxLength={10}
            type="text"
            placeholder="请输入昵称"
            v-model="nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </UseBorder>
      </div>
      <div className={styles["password"]}>
        <span className={styles["hint"]}>房间密码：</span>
        <UseBorder>
          <input
            type="text"
            maxLength={20}
            placeholder="(可选)"
            v-model="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </UseBorder>
      </div>
      <Btn
        className="w-create"
        onClick={() => createRoom(nickName, password, characters)}
      >
        确认创建
      </Btn>
    </div>
  );
};

export default CreateRoom;
