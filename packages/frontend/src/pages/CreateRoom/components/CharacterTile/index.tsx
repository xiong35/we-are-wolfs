import styles from "./index.module.less";
import { FC } from "react";
import { Avatar } from "../../../../components/Avatar";
import { ESetableCharacters } from "@werewolf/shared";
import classNames from "classnames";

export type ICharacterTileProps = {
  num: number;
  setNum: (num: 1 | -1) => void;
  character: ESetableCharacters;
};

export const CharacterTile: FC<ICharacterTileProps> = ({
  num,
  setNum,
  character,
}) => {
  return (
    <div
      className={classNames(
        styles["w-character_tile"],
        "w-character_tile",
        character
      )}
    >
      <Avatar character={character}></Avatar>
      <div className={styles["controll"]}>
        <div onClick={() => setNum(-1)} className={styles["down"]}></div>
        <div className={styles["number"]}>{num}</div>
        <div onClick={() => setNum(1)} className={styles["up"]}></div>
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
