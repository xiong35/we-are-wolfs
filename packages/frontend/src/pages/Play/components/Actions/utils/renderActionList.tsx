import { EGameStatus, IPlayer } from "@werewolf/shared";
import { potion } from "../../../../../signals/actions";
import { players } from "../../../../../signals/game";
import { ActionsBtn } from "../../ActionsBtn";

const actionInfoList: {
  content: string;
  checkIsShown: (self: IPlayer) => boolean;
  checkDisabled: (gameStatus: EGameStatus, self: IPlayer) => boolean;
  noTarget?: undefined | true;
  onClick?: () => void;
}[] = [
  {
    content: "票选狼人",
    checkIsShown: (self) => true,
    checkDisabled: (gameStatus) => gameStatus !== "EXILE_VOTE",
  },
  {
    content: "票选警长",
    checkIsShown: (self) => true,
    checkDisabled: (gameStatus) => gameStatus !== "SHERIFF_VOTE",
  },
  {
    content: "参与警长竞选",
    checkIsShown: (self) => true,
    checkDisabled: (gameStatus) => gameStatus !== "SHERIFF_ELECT",
    noTarget: true,
  },
  {
    content: "狼人杀人",
    checkIsShown: (self) => self.character === "WEREWOLF",
    checkDisabled: (gameStatus) => gameStatus !== "WOLF_KILL",
  },
  {
    content: "查验身份",
    checkIsShown: (self) => self.character === "SEER",
    checkDisabled: (gameStatus) => gameStatus !== "SEER_CHECK",
  },
  {
    content: "使用毒药",
    checkIsShown: (self) => self.character === "WITCH",
    checkDisabled: (gameStatus) => gameStatus !== "WITCH_ACT",
    onClick: () => (potion.value = "POISON"),
  },
  {
    content: "使用灵药",
    checkIsShown: (self) => self.character === "WITCH",
    checkDisabled: (gameStatus) => gameStatus !== "WITCH_ACT",
    onClick: () => (potion.value = "MEDICINE"),
  },
  {
    content: "保护一名玩家",
    checkIsShown: (self) => self.character === "GUARD",
    checkDisabled: (gameStatus) => gameStatus !== "GUARD_PROTECT",
  },
  {
    content: "传递警徽",
    checkIsShown: (self) => self.isSheriff,
    checkDisabled: (gameStatus) => gameStatus !== "SHERIFF_ASSIGN",
  },
  {
    content: "猎人开枪",
    checkIsShown: (self) => self.character === "HUNTER",
    checkDisabled: (gameStatus) => gameStatus !== "HUNTER_SHOOT",
  },
  {
    content: "结束发言",
    checkIsShown: (self) => true,
    checkDisabled: (gameStatus, self) => {
      if (gameStatus === "DAY_DISCUSS") return !self.isAlive;
      if (gameStatus === "SHERIFF_SPEECH" && self.canBeVoted) return false;

      if (gameStatus === "LEAVE_MSG") {
        const dyingPlayer = players.value.find((p) => p.isDying);
        if (dyingPlayer && dyingPlayer.index === self.index) return false;
      }

      return true;
    },
    noTarget: true,
  },
];

export const renderActionList = (
  gameStatus: EGameStatus,
  self: IPlayer,
  closeActions: () => void
) =>
  actionInfoList.map((i) => {
    if (!i.checkIsShown(self)) return null;

    /** 死了还能用的按钮 */
    if (~["传递警徽", "猎人开枪", "结束发言"].indexOf(i.content)) {
      return (
        <ActionsBtn
          key={i.content}
          noTarget={!!i.noTarget}
          onClick={i.onClick}
          disabled={i.checkDisabled(gameStatus, self)}
          closeActions={closeActions}
        >
          {i.content}
        </ActionsBtn>
      );
    }

    /** 死了就不能用了的按钮 */
    return (
      <ActionsBtn
        key={i.content}
        noTarget={!!i.noTarget}
        onClick={i.onClick}
        disabled={i.checkDisabled(gameStatus, self) || !self.isAlive}
        closeActions={closeActions}
      >
        {i.content}
      </ActionsBtn>
    );
  });
