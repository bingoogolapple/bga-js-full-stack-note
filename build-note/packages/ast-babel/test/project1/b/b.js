import { printA } from "../a/a.js";
printA('来自b.js的消息')

export const b = "b-value";
export const printB = (msg) => {
  console.log(`在 b.js 中打印：${msg}`);
};
