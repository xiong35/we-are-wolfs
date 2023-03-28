/* 将游戏记录存在 localStorage 的相关操作 */

import { ECharacter, IGameEvent, Index, IPlayer } from "@werewolf/shared";

const ROOM_NUMBER_PREFIX = "w-roomnumber";
const ROOM_LIST_KEY = "w-rooms";

type RoomRecord = RoomRecordBrief & {
  groupedGameEvents: IGameEvent[][]; // 按天数归类的对局信息
  playerBriefs: {
    name: string;
    index: Index;
    character: ECharacter;
  }[];
  selfIndex: Index;
};

type RoomRecordBrief = {
  /** 游戏结束时的时间戳 */
  time: number;
  roomNumber: string;
};

function getKeyByNumberNTime(roomNumber: string, time: number): string {
  return `${ROOM_NUMBER_PREFIX}-${roomNumber}-${time}`;
}

export function saveRecord(
  groupedGameEvents: IGameEvent[][],
  roomNumber: string,
  self: IPlayer,
  players: IPlayer[],
  time: number
) {
  const recordBrief: RoomRecordBrief = {
    roomNumber,
    time,
  };
  const record: RoomRecord = {
    groupedGameEvents,
    playerBriefs: players.map((p) => ({
      name: p.name,
      index: p.index,
      character: p.character,
    })),
    selfIndex: self.index,
    ...recordBrief,
  };
  localStorage.setItem(
    getKeyByNumberNTime(roomNumber, time),
    JSON.stringify(record)
  );

  let roomList: RoomRecordBrief[] = [];
  try {
    const prevRoomListStr = localStorage.getItem(ROOM_LIST_KEY) || "[]";
    roomList = JSON.parse(prevRoomListStr) as RoomRecordBrief[];
  } catch {}
  roomList.push(recordBrief);
  localStorage.setItem(ROOM_LIST_KEY, JSON.stringify(roomList));
}

export function getAllRecords(): RoomRecordBrief[] {
  const prevRoomListStr = localStorage.getItem(ROOM_LIST_KEY) || "[]";
  return JSON.parse(prevRoomListStr) as RoomRecordBrief[];
}

export function getRecordByNumberNTime(
  roomNumber: string,
  time: number
): RoomRecord | null {
  const key = getKeyByNumberNTime(roomNumber, time);

  const recordStr = localStorage.getItem(key);

  if (!recordStr) return null;

  return JSON.parse(recordStr) as RoomRecord;
}
