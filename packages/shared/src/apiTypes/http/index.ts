export interface IHttpRes<T = {}> {
  status: number;
  msg: string;
  data: T;
}
