// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require("electron")
const { BrowserWindow } = require("electron").remote
const fs = require("fs")
const root = fs.readdirSync("/")
console.log("-------------")
console.log(root)
console.log("-------------")

window.addEventListener("DOMContentLoaded", () => {
  // 手动发消息给主进程调用主进程 API
  document.getElementById("sendToMainProcess").addEventListener("click", () => {
    ipcRenderer.send("childProcessMessage", "我是来自子进程的消息")
  })
  ipcRenderer.on("mainProcessMessage", (event, arg) => {
    console.log(event, arg)
    document.getElementById("message").innerHTML = arg
  })
  // electron 帮我们封装了 remote 模块，可以使用 remote 模块自动发消息访问主进程 API
  document.getElementById("openNewWindow").addEventListener("click", () => {
    let window = new BrowserWindow({ width: 600, height: 600 })
    window.loadURL("https://www.baidu.com")
  })

  document.getElementById("sendNotification").onclick = () => {
    let notification = new Notification("我是标题", {
      body: "我是通知内容"
    })
    notification.onclick = () => {
      console.log("通知被点击")
    }
  }
})
