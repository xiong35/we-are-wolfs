import fs from "fs";

let _log: boolean = fs.existsSync("./_log");

export function log(...args: any[]) {
  if (_log) {
    console.log(new Date().toISOString(), ...args);
  }
}
