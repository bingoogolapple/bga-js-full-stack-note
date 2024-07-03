# 构建学习笔记

## --inspect-brk 和 --inspect 的区别

- --inspect: 使用这个选项启动 Node.js 应用时，程序会正常启动，并且立即开始执行代码。如果你想在程序的一开始就暂停执行，以便例如设置断点，那么你需要手动在代码中添加 debugger 语句或者在连接的调试客户端中设置断点。
- --inspect-brk: 使用这个选项启动 Node.js 应用时，程序会在第一行代码执行之前暂停。这样做的好处是，即使你的程序一开始就有错误或者你想在程序最开始的地方设置断点，你也有机会在代码执行之前进行调试。这对于调试初始化代码或者在程序开始时立即出现的问题特别有用
- 打开 Chromium 浏览器的开发人员工具，点击 Node 图标即可打开 Node.js 的专用开发工具

## 运行 ts

- 使用 [tsx](https://www.npmjs.com/package/tsx)
  - 能省去一些配置
  - 自带 watch，无需安装 nodemon
  - 比 ts-node 要快

## https://astexplorer.net
