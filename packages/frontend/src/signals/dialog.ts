import { signal, computed } from "@preact/signals-react";
import { IS_DEV, None } from "@werewolf/shared";

type Timeout = number;
export type DialogInfo = {
  content: string;
  timeout: Timeout;
};

export const dialogTimeLeft = signal<Timeout>(None);
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
  if (IS_DEV) {
    return console.log("# dialog", { toShowContent, timeout });
  }
  toShowDialogs.value = [
    ...toShowDialogs.value,
    {
      content: toShowContent,
      timeout: timeout,
    },
  ];
  tryShowFirstDialog();
}

export function hideDialog() {
  dialogTimeLeft.value = None;
  clearInterval(timer);
  timer = undefined;
  toShowDialogs.value = toShowDialogs.value.slice(1);

  tryShowFirstDialog();
}

let timer: number | undefined = undefined;

function tryShowFirstDialog() {
  if (timer) return;
  if (!currentContent.value) return;

  const time = currentContent.value.timeout;

  dialogTimeLeft.value = time;

  timer = window.setInterval(() => {
    if (dialogTimeLeft.value === 1) {
      hideDialog();
      return;
    }
    dialogTimeLeft.value--;
  }, 1000);
}
