import { ipcMain, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

import { sendToMainWindow } from './window'

let controlWindow: BrowserWindow | undefined
function createControWindow() {
  controlWindow = new BrowserWindow({
    x: 100,
    y: 0,
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const secondUrl = isDev
    ? `file://${path.join(__dirname, '../public/second.html')}`
    : `file://${path.join(__dirname, 'second.html')}`
  controlWindow.loadURL(secondUrl)
  // 打开开发者工具
  if (isDev) {
    controlWindow.webContents.openDevTools()
  }
  controlWindow.on('closed', () => {
    controlWindow = undefined
    console.log('控制窗口已关闭')
  })

  let anyGlobal: any = global
  anyGlobal.sharedObject = {
    controlWindowWebContentsId: controlWindow.webContents.id
  }
}

export function handleRemoteControl() {
  ipcMain.handle('remoteControlLogin', async () => {
    console.log('remoteControlLogin')
    let localCode = Math.floor(Math.random() * (999999 - 100000)) + 100000
    return localCode
  })

  ipcMain.handle(
    'startControl',
    (event: Electron.IpcMainInvokeEvent, remoteCode: string) => {
      console.log('startControl', remoteCode)

      sendToMainWindow('control-state-changed', remoteCode, 1)

      // 也可以拿到具体的 WebContent（event.sender） 来调 send 方法从主进程发消息给子进程，子进程通过 on 接收
      // event.sender.send('control-state-changed', remoteCode, 1)

      createControWindow()
    }
  )
}
