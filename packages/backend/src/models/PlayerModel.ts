import {
  ECharacter,
  ICharacterStatus,
  IDieInfo,
  IPlayer,
  IPublicPlayer,
} from "@werewolf/shared";
import { Room } from "./RoomModel";
import { nanoid } from "nanoid";

export class Player implements IPlayer {
  _id: string;
  isAlive = true;
  isSheriff = false;
  exileVotes: number[] = [];
  sheriffAssigns: number[] = [];
  sheriffElectVote?: number;
  die: IDieInfo = null;
  isDying: boolean = false;
  canBeVoted: boolean = false;

  // is set when game begins
  character: ECharacter;
  characterStatus?: ICharacterStatus;

  constructor(public name: string, public index: number) {
    this._id = nanoid();
  }

  /**
   * 将 Player 信息转换成公开的信息
   * @returns 可公开的信息
   */
  getPublic(room: Room): IPublicPlayer {
    return {
      index: this.index,
      isAlive: this.isAlive,
      isSheriff: this.isSheriff,
      name: this.name,
      isDying: this === room.curDyingPlayer,
      canBeVoted: this.canBeVoted,
      exileVotes: this.exileVotes,
      sheriffAssigns: this.sheriffAssigns,
      sheriffElectVote: this.sheriffElectVote,
    };
  }
}
