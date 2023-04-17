export function sleep(n: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, n);
  });
}
