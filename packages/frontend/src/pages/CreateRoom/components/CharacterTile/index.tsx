import styles from "./index.module.less";
import { FC } from "react";
import { Avatar } from "../../../../components/Avatar";
import { ECharacter } from "@werewolf/shared";

export type ICharacterTileProps = {
  num: number;
  setNum: (num: number) => void;
  character: ECharacter;
};

export const CharacterTile: FC<ICharacterTileProps> = ({
  num,
  setNum,
  character,
}) => {
  return (
    <div className={styles["w-character_tile"]}>
      <Avatar character={character}></Avatar>
      <div className={styles["controll"]}>
        <div onClick={() => setNum(num - 1)} className={styles["down"]}></div>
        <div className={styles["number"]}>{num}</div>
        <div onClick={() => setNum(num + 1)} className={styles["up"]}></div>
      </div>
    </div>
  );
};

// <script lang="ts">
//   import { defineComponent, toRef } from "vue";

//   import {
//     setCharacter,
//     characters,
//   } from "../reactivity/createRoom";

//   import {
//     ChineseNames,
//     SetableCharacters,
//   } from "../../shared/GameDefs";

//   import CharacterAvatar from "./Avatar.vue";

//   const RoomCharacter = defineComponent({
//     name: "RoomCharacter",
//     components: { CharacterAvatar },
//     props: {
//       character: { type: String, required: true },
//     },
//     setup(props) {
//       const num = toRef(
//         characters,
//         props.character as SetableCharacters
//       );
//       const name =
//         ChineseNames[props.character as SetableCharacters];
//       return { setCharacter, name, num };
//     },
//   });

//   export default RoomCharacter;
// </script>
