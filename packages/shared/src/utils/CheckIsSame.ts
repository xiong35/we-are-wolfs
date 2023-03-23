/** 检查两个 union 是否 完全一致 */
export type CheckIsSame<T, U> = Exclude<T, U> extends never
  ? Exclude<U, T> extends never
    ? true
    : false
  : false;
