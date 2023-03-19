import "./index.less";
import { FC } from "react";
import classNames from "classnames";
import { Index, IPublicPlayer, None } from "@werewolf/shared";
import { getIsActing } from "../../../../signals/actions";
import { ReactComponent as SvgSheriff } from "../../../../assets/sheriff.svg";
import { ReactComponent as SvgSkull } from "../../../../assets/skull.svg";
import { formatName } from "./utils/formatName";

export type IPlayerListItemProps = {
  isEmpty: boolean;
  player: IPublicPlayer;
  target: Index;
  setTarget: (target: Index) => void;
} & React.HTMLAttributes<HTMLDivElement>;

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
        <div className="w-player_list_item-box empty">
          <span className="index">{player.index}</span>
        </div>
      </div>
    );
  }

  const { isAlive, isDying, isSheriff, index, name } = player;
  /** 是否正在执行操作(会被高亮) */
  const isActing: boolean = getIsActing();
  /** 是否被选中 */
  const isChosen: boolean = player.index === target && isActing;

  const { fontSize, formattedName } = formatName(player.name);

  return (
    <div className={classNames("w-player_list_item", className)}>
      <div
        style={{ cursor: isActing ? "pointer" : "not-allowed", fontSize }}
        className={classNames("w-player_list_item-box", {
          isDead: isAlive,
          isChosen,
        })}
        onClick={() => setTarget(target === index ? None : index)}
      >
        {formattedName}
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
