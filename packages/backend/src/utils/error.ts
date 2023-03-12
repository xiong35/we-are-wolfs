export type IErrorMsg = {
  status: number;
  msg: string;
};

/**
 * 接受 status 和 msg，将其包装成 json 字符串传给 Error 的 message
 */
export class WError extends Error {
  constructor(status: number, msg: string) {
    super(JSON.stringify({ status, msg }));
  }
}
