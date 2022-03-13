// 会与 express 的 index.d.ts 中的进行融合
declare namespace Express {
  interface Request {
    // 问题1: express 库的类型定义文件 .d.ts 文件类型描述不准确
    // 问题2: 当使用中间件的时候，如果对 req 或者 res 做了修改之后，实际上类型并不能改变，所以在这里单独添加类型定义
    developer: string
  }
}
