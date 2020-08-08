"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// 引入 electron 中的类型
// import { IpcRendererEvent } from 'electron'
// 引入 electron 中的对象
var ipcRenderer = window.require('electron').ipcRenderer;
var BrowserWindow = window.require('electron').remote.BrowserWindow;
var fs = window.require('fs');
var root = fs.readdirSync('/');
console.log('-------------');
console.log(root);
console.log('-------------');
window.addEventListener('DOMContentLoaded', function () {
    // 手动发消息给主进程调用主进程 API
    document
        .getElementById('sendToMainProcess')
        .addEventListener('click', function () {
        ipcRenderer.send('childProcessMessage', '我是来自子进程的消息');
    });
    ipcRenderer.on('mainProcessMessage', function (event, arg) {
        console.log(event, arg);
        document.getElementById('message').innerHTML = arg;
    });
    // electron 帮我们封装了 remote 模块，可以使用 remote 模块自动发消息访问主进程 API
    document.getElementById('openNewWindow').addEventListener('click', function () {
        var window = new BrowserWindow({ width: 600, height: 600 });
        window.loadURL('https://www.baidu.com');
    });
    document.getElementById('sendNotification').onclick = function () {
        var notification = new Notification('我是标题', {
            body: '我是通知内容'
        });
        notification.onclick = function () {
            console.log('通知被点击');
        };
    };
});
