let _log: boolean = true;

export function log(...args: any[]) {
  if (_log) {
    console.log(new Date().toISOString(), ...args);
  }
}
