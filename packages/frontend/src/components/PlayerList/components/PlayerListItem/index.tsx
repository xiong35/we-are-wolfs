import "./index.less";
import { FC } from "react";
import classNames from "classnames";
import { Index, IPublicPlayer, None } from "@werewolf/shared";
import { getIsActing } from "../../../../signals/actions";
import { ReactComponent as SvgSheriff } from "../../../../assets/sheriff.svg";
import { ReactComponent as SvgSkull } from "../../../../assets/skull.svg";

type IEmptyPlayer = {
  isEmpty: true;
  player: number;
  target?: never;
  setTarget?: never;
};

type INoneEmptyPlayer = {
  isEmpty: false;
  player: IPublicPlayer;
  target: Index;
  setTarget: (target: Index) => void;
};

export type IPlayerListItemProps = (IEmptyPlayer | INoneEmptyPlayer) &
  React.HTMLAttributes<HTMLDivElement>;

export const PlayerListItem: FC<IPlayerListItemProps> = ({
  isEmpty,
  player,
  className,
  target,
  setTarget,
}) => {
  if (isEmpty) {
    return (
      <div className={classNames("w-player_list_item", className)}>
        <div v-else className="w-player_list_item-box empty">
          <span className="index">{player}</span>
        </div>
      </div>
    );
  }

  const { isAlive, isDying, isSheriff, index, name } = player;
  /** 是否正在执行操作(会被高亮) */
  const isActing: boolean = getIsActing();
  /** 是否被选中 */
  const isChosen: boolean = player.index === target && isActing;

  return (
    <div className={classNames("w-player_list_item", className)}>
      <div
        style={{ cursor: isActing ? "pointer" : "not-allowed" }}
        className={classNames("w-player_list_item-box", {
          isDead: isAlive,
          isChosen,
        })}
        onClick={() => setTarget(target === index ? None : index)}
      >
        {name.slice(0, 3) + (name.length > 3 ? "..." : "")}
        <div className="w-player_list_item-index">
          <span className="w-player_list_item-index-content">{index}</span>
        </div>

        {isSheriff && <SvgSheriff className="w-player_list_item-sherrif" />}
        {isAlive && (
          <SvgSkull
            className={classNames("w-player_list_item-skull", { isDying })}
          />
        )}
      </div>
    </div>
  );
};
