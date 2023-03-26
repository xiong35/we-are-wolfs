import { EGameStatusWithAction } from "@werewolf/shared";
import { Player } from "../models/PlayerModel";
import { Room } from "../models/RoomModel";

/**
 * 检验此玩家是否能在当前阶段发送请求
 * @param room
 * @param player
 * @return {boolean} 合规 或 违规原因
 */
export function validateIdentity(room: Room, player: Player): true | string {
  const gameStatus = room.curStatus;

  switch (gameStatus) {
    case "HUNTER_SHOOT":
      return (
        (player.character === "HUNTER" &&
          room.curDyingPlayer.id === player.id) ||
        "你不是猎人"
      );
    case "SHERIFF_ASSIGN":
      return (
        (player.isSheriff && room.curDyingPlayer.id === player.id) ||
        "你不是警长"
      );
    case "LEAVE_MSG":
      return (
        (player.isDying && room.curDyingPlayer.id === player.id) ||
        "你不能发表遗言"
      );
  }

  if (!player.isAlive) return "你已经是个死人了"; // 除了猎人和警长或者结束发言, 都必须明面上活着才能进行操作

  switch (gameStatus as EGameStatusWithAction) {
    case "WOLF_KILL":
      return player.character === "WEREWOLF" || "你不是狼人";
    case "SEER_CHECK":
      return player.character === "SEER" || "你不是预言家";
    case "WITCH_ACT":
      return player.character === "WITCH" || "你不是女巫";
    case "GUARD_PROTECT":
      return player.character === "GUARD" || "你不是守卫";
    case "DAY_DISCUSS":
      return room.toFinishPlayers.has(player.index) || "你不能发言";
    case "SHERIFF_ELECT":
    case "EXILE_VOTE":
    case "SHERIFF_VOTE":
      return true;
    case "SHERIFF_SPEECH":
      return room.toFinishPlayers.has(player.index) || "你不能发言";
  }

  // TODO 检查是否有遗漏的状态

  return "操作不合法";
}
