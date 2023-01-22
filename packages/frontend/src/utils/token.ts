import { IToken, TokenKey } from "@werewolf/shared";

function isToken(token: any): token is IToken {
  return (
    token &&
    typeof token.ID === "string" &&
    typeof token.roomNumber === "string" &&
    typeof token.datetime === "number"
  );
}

export function setToken(ID: string, roomNumber: string) {
  const token: IToken = {
    ID,
    datetime: Date.now(),
    roomNumber,
  };
  window.localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function getToken(): IToken | null {
  try {
    const str = window.localStorage.getItem(TokenKey) || "{}";
    const token = JSON.parse(str);
    if (isToken(token)) {
      const dtDiff = Date.now() - token.datetime;
      // 一天内的 token 才有效
      if (0 < dtDiff && dtDiff < 1000 * 3600 * 24) {
        return token;
      } else {
        window.localStorage.removeItem(TokenKey);
      }
    }
  } catch (e) {
    // pass
  }

  return null;
}
