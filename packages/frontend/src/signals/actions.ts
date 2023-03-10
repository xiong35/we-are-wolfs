import { signal } from "@preact/signals-react";

const isActing = signal(false);

export function getIsActing() {
  return isActing.value;
}

export function setIsActing(value: boolean) {
  isActing.value = value;
}
