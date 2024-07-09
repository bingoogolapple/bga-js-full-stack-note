import { b } from "../b/b.js";
import './a.css';

export const a = "a-value";
export const getA = () => {
  return `在 a.js 中打印：${b}`;
};
