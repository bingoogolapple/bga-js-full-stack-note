import { printB } from "../b/b.js";
printB('来自a.js的消息')


export const a = "a-value";
export const printA = (msg) => {
  console.log(`在 a.js 中打印：${msg}`);
};
