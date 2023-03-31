import { IPublicPlayer } from "@werewolf/shared";

export function getMockPlayers(num: number): IPublicPlayer[] {
  const players = [];
  for (let i = 0; i < num; i++) {
    players.push(genPlayer(i + 1));
  }
  return players;
}

function genPlayer(index: number): IPublicPlayer {
  return {
    canBeVoted: true,
    exileVotes: [],
    index,
    isAlive: true,
    isDying: false,
    isSheriff: true,
    name: `Player ${index}`,
    sheriffAssigns: [],
    sheriffElectVote: 0,
  };
}
