export const CLIENT_BASE_URL = "http://localhost:3000";
// "http://werewolf.xiong35.cn";
export const SERVER_DOMAIN = "http://localhost:3011";
// "http://werewolf.xiong35.cn";

// TODO nginx 改改
// export const SERVER_BASE_URL = SERVER_DOMAIN + "/api";
export const SERVER_BASE_URL = SERVER_DOMAIN;

export const WS_PATH_CLIPPED = "/werewolf-ws";
export const WS_PATH = "" + WS_PATH_CLIPPED;
// TODO nginx 改改
// export const WS_PATH = "/api" + WS_PATH_CLIPPED;

export const HeaderPlayerID = "w-player-id";
export const HeaderRoomNumber = "w-room-number";

export const StoragePrefix = `w-werewolf-`;
export const TokenKey = `${StoragePrefix}token`;

export const None = 0;

export const IS_DEV = true;
