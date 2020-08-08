"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var path_1 = __importDefault(require("path"));
function createWindow() {
    // 创建浏览器窗口
    var mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true // 可以在 Render Process 里使用 Node
        }
    });
    // 并且为你的应用加载 index.html
    var url = electron_is_dev_1.default
        ? 'http://localhost:3000'
        : "file://" + path_1.default.join(__dirname, '../build/index.html');
    console.log('url 为', url);
    console.log(electron_is_dev_1.default ? '开发环境' : '生产环境');
    mainWindow.loadURL(url);
    // mainWindow.loadFile('index.html')
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
    // 设置 Mac Dock 加载进度条
    //   mainWindow.setProgressBar(0.5)
    // 设置最近文件
    //   app.addRecentDocument('~/Desktop/test.txt')
    electron_1.ipcMain.on('childProcessMessage', function (event, arg) {
        console.log(event, arg);
        event.reply('mainProcessMessage', '我是来自主进程的消息');
    });
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
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
//当所有窗口都被关闭后退出
electron_1.app.on('window-all-closed', function () {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
