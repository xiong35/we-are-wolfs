import "./index.less";
import { FC, SVGProps } from "react";
import { ECharacter, ZHNames } from "@werewolf/shared";
import classNames from "classnames";

import { ReactComponent as SvgGuard } from "../../assets/guard.svg";
import { ReactComponent as SvgHunter } from "../../assets/hunter.svg";
import { ReactComponent as SvgSeer } from "../../assets/seer.svg";
import { ReactComponent as SvgVillager } from "../../assets/villager.svg";
import { ReactComponent as SvgWerewolf } from "../../assets/werewolf.svg";
import { ReactComponent as SvgWitch } from "../../assets/witch.svg";
export type IAvatarProps = {
  character: ECharacter;
};

const mapCharacterToSVG: Record<ECharacter, FC<SVGProps<SVGSVGElement>>> = {
  "": () => null,
  HUNTER: SvgHunter,
  WITCH: SvgWitch,
  SEER: SvgSeer,
  GUARD: SvgGuard,
  VILLAGER: SvgVillager,
  WEREWOLF: SvgWerewolf,
  SHERIFF: () => null,
};

export const Avatar: FC<IAvatarProps> = ({ character }) => {
  const name = ZHNames[character];
  const Svg = mapCharacterToSVG[character];
  return (
    <div className={classNames("w-avatar")}>
      <Svg className="icon" />
      <div className="info">{name}</div>
    </div>
  );
};

// <script lang="ts">
//   import { computed, defineComponent } from "vue";
//   import {
//     ChineseNames,
//     SetableCharacters,
//   } from "../../shared/GameDefs";

//   import { theme } from "../reactivity/theme";

//   const Avatar = defineComponent({
//     name: "Avatar",
//     props: {
//       character: { type: String, required: true },
//     },
//     setup(props) {
//       const name = computed(
//         () => ChineseNames[props.character as SetableCharacters]
//       );
//       return { theme, name };
//     },
//   });

//   export default Avatar;
// </script>
