import { a } from "../a/a.js";
import './b.css';

export const b = "b-value";
export const getB = () => {
  return `在 b.js 中打印：${a}`;
};
