import { signal, computed } from "@preact/signals-react";

type Timeout = number;
export type DialogInfo = {
  content: string;
  timeout: Timeout;
};

export const dialogTimeLeft = signal<Timeout>(0);
export const toShowDialogs = signal<DialogInfo[]>([]);

export const currentContent = computed<DialogInfo | null>(() =>
  toShowDialogs.value.length ? toShowDialogs.value[0] : null
);

/**
 * 展示一个出现 timeout 秒数(默认5) 的弹窗
 * @param toShowContent 显示的文字(支持 html)
 * @param timeout 显示的秒数
 */
export function showDialog(toShowContent: string, timeout: number = 5) {
  toShowDialogs.value.push({
    content: toShowContent,
    timeout: timeout,
  });
}
