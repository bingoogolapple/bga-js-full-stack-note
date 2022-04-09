import { app, BrowserWindow, globalShortcut } from 'electron'
import { createWindow, handleIPC } from './window'
import { createMenu } from './menu'
import { handleRemoteControl } from 'remoteControl'

// Electron 会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  console.log('-------------- ready')

  createWindow()
  handleIPC()
  createMenu()

  handleRemoteControl()

  app.on('activate', () => {
    console.log('-------------- activate')
    // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  const result = globalShortcut.register('command + t', () => {
    console.log('触发快捷键')
  })
  console.log('注册全局快捷键', result)
})

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  console.log('-------------- window-all-closed')
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  console.log('-------------- before-quit')
})
app.on('will-quit', () => {
  console.log('-------------- will-quit')
  globalShortcut.unregister('command + t')
})
app.on('quit', () => {
  console.log('-------------- quit')
})
