import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true // 可以在 Render Process 里使用 Node
    }
  })
  // 并且为你的应用加载 index.html

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  console.log('url 为', url)
  console.log(isDev ? '开发环境' : '生产环境')
  mainWindow.loadURL(url)
  // mainWindow.loadFile('index.html')

  // 打开开发者工具
  mainWindow.webContents.openDevTools()

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

// Electron 会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
