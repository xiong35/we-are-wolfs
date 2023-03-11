import { ICharacterStatus } from "./character";
import { ECharacter, EGameStatus } from "./gameMeta";

/** 玩家 ID */
export type ID = string;
/** 玩家编号，从 1 开始 */
export type Index = number;

/**
 * 第0夜: 0
 * 第 n 天白天: 2n-1
 * 第 n 天晚上: 2n
 */
export type Day = number;

/** 未开始游戏时的房间信息 */
export type IRoomMeta = {
  /** 房间号码, 6 位数字 */
  roomNumber: string;
  /** 创建者 ID */
  creatorID: ID;
  /** 是否设置密码, 存放哈希过的密码 */
  password?: string;
  /** 设置的角色 */
  needingCharacters: ECharacter[];
  /** 空缺的玩家号码 */
  remainingIndexes: Index[];
};

/**
 * 每局游戏的信息
 * (仅存在后端)
 */
export type IRoom = IRoomMeta & {
  /** 当前天数 */
  currentDay: Day;
  /** 是否已结束 */
  isFinished: boolean;
  /** 所有的游戏状态的栈 */
  gameStatus: EGameStatus[];
  /** 待结束当前阶段的玩家(每次改变状态需重置) */
  toFinishPlayers: Set<Index>;
  /** 事件定时器 id, undefined 则为结束 */
  timer: NodeJS.Timeout | undefined;
  /** 参与者 */
  players: IPlayer[];
};

/** 每个玩家公开的信息 */
export type IPublicPlayer = {
  // 此状态不代表实际存活状态, 仅代表公开的存活信息
  // 如, 晚上有角色被杀了, 但是只有
  /** 玩家编号 */
  index: Index;
  /** 昵称 */
  name: string;
  /** 是否存活 */
  isAlive: boolean;
  /** 是否为警长 */
  isSheriff: boolean;
  /** 是否正在进行死亡结算 */
  isDying: boolean;
  /**
   * 白天处决的投票记录
   * 下标是天数, value 是投给了谁
   * #TODO 曾是 hasVotedAt
   */
  exileVotes: Index[];
  /**
   * 下标是天数, 包括:
   * 上警(index=0)
   * 白天传警徽 index 为奇数
   * #TODO 曾是 sheriffVotes
   */
  sheriffAssigns: Index[];
  /**
   * 第一天上警时投给了谁
   * undefined 则为弃票(也是初始值)
   */
  sheriffElectVote?: Index;
  /**是否能在当前阶段被投票 */
  canBeVoted: boolean;
};

export type IPlayer = IPublicPlayer & {
  /**游戏角色 */
  character: ECharacter;
  /**允许自定义 */
  characterStatus?: ICharacterStatus;
  /** 具体死亡信息, null 则为还存活 */
  die: {
    /**第几天死的 */
    at: Day;
    /**被哪些人杀死的(名字) */
    fromIndex: Index[];
    /**被哪个角色杀死的 */
    fromCharacter: ECharacter;
  } | null;
  _id: ID;
};
