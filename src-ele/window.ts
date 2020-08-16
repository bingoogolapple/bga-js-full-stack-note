import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

let mainWindow: BrowserWindow | undefined
let childWindow: BrowserWindow | undefined
export function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    x: 100,
    y: 250,
    width: 1200,
    height: 650,
    webPreferences: {
      nodeIntegration: true, // 可以在 Render Process 里使用 Node
      webSecurity: false
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

  mainWindow.on('closed', () => {
    mainWindow = undefined
    console.log('主窗口已关闭')
  })

  // 设置 Mac Dock 加载进度条
  //   mainWindow.setProgressBar(0.5)
  // 设置最近文件
  //   app.addRecentDocument('~/Desktop/test.txt')
  createChildWindow()
}

function createChildWindow() {
  childWindow = new BrowserWindow({
    x: 100,
    y: 0,
    width: 400,
    height: 200,
    parent: mainWindow, // 拖动主窗口时子窗口会和主窗口联动
    webPreferences: {
      nodeIntegration: true // 可以在 Render Process 里使用 Node
    }
  })

  const secondUrl = isDev
    ? `file://${path.join(__dirname, '../public/second.html')}`
    : `file://${path.join(__dirname, 'second.html')}`
  childWindow.loadURL(secondUrl)
  // 打开开发者工具
  if (isDev) {
    childWindow.webContents.openDevTools()
  }
  childWindow.on('closed', () => {
    childWindow = undefined
    console.log('子窗口已关闭')
  })

  let anyGlobal: any = global
  anyGlobal.sharedObject = {
    childWindowWebContentsId: childWindow.webContents.id
  }
}

export function handleIPC() {
  setTimeout(() => {
    // 启动时主进程立即通过 webContents 发送消息给指定的渲染进程
    mainWindow?.webContents.send(
      'SendOnMainProcessMessage',
      '启动时 webContents.send 消息'
    )
  }, 1000)

  ipcMain.on(
    'SendOnChildProcessMessage',
    (event: Electron.IpcMainEvent, p1, p2) => {
      console.log(event, p1, p2)

      event.reply(
        'SendOnMainProcessMessage',
        '我是来自主进程的 on 中 replay 方法返回的消息'
      )

      // 也可以拿到具体的 WebContent（event.sender） 来调 send 方法从主进程发消息给子进程，子进程通过 on 接收
      // event.sender.send(
      //   'SendOnMainProcessMessage',
      //   '我是来自主进程的 on 中 webContents.send 方法返回的消息'
      // )
    }
  )
  ipcMain.handle(
    'InvokeHandleChildProcessMessage',
    (event: Electron.IpcMainInvokeEvent, p1, p2) => {
      console.log(event, p1, p2)
      return new Promise((resolve, reject) => {
        resolve('我是来自主进程的 handle 方法返回的消息')

        // 也可以拿到具体的 WebContent（event.sender） 来调 send 方法从主进程发消息给子进程，子进程通过 on 接收
        event.sender.send(
          'SendOnMainProcessMessage',
          '我是来自主进程的 handle 中 webContents.send 方法返回的消息'
        )
      })
    }
  )
}

export function sendToMainWindow(channel: string, ...args: any[]) {
  mainWindow?.webContents.send(channel, args)
}
