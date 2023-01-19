import ReadLine  from "readline";

/**
 * 读取一段用户输入
 * @param {string} hint 提示词
 */
export async function readline(hint) {
  return new Promise((resolve, reject) => {
    const rl = ReadLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // ask user for the anme input
    rl.question(hint, (ans) => {
      resolve(ans);
      // close the stream
      rl.close();
    });
  });
}
