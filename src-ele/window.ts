import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

export function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true, // 可以在 Render Process 里使用 Node
      enableRemoteModule: true
    }
  })

  // 并且为你的应用加载 index.html
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'index.html')}`
  mainWindow.loadURL(url)

  // 打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  // 设置 Mac Dock 加载进度条
  //   mainWindow.setProgressBar(0.5)
  // 设置最近文件
  //   app.addRecentDocument('~/Desktop/test.txt')

  ipcMain.on('childProcessMessage', (event, arg) => {
    console.log(event, arg)
    event.reply('mainProcessMessage', '我是来自主进程的消息')
  })

  // const childWindow = new BrowserWindow({
  //   width: 700,
  //   height: 400,
  //   parent: mainWindow, // 拖动主窗口时子窗口会和主窗口联动
  //   webPreferences: {
  //     nodeIntegration: true // 可以在 Render Process 里使用 Node
  //   }
  // })
  // childWindow.loadFile('../child.html')
  // childWindow.webContents.openDevTools()
}
