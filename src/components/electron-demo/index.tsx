import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card } from 'antd'

// 引入 electron 中的类型
import { IpcRendererEvent } from 'electron'
// 引入 electron 中的对象
const { ipcRenderer } = window.require('electron')
const { BrowserWindow } = window.require('electron').remote

const ElectronDemo: React.FC = () => {
  const [mainProcessMessage, setMainProcessMessage] = useState('')
  useEffect(() => {
    console.log(
      `第二个参数传 [] 时只会在组件第一次加载完成时执行 useEffect，类似于 componentDidMount`
    )

    let channel = 'mainProcessMessage'
    ipcRenderer.on(channel, (event: IpcRendererEvent, arg: string) => {
      console.log(event, arg)
      setMainProcessMessage(arg)
    })

    return () => {
      console.log(
        `第二个参数传 [] 时只会在组件卸载时执行清除，类似于 componentWillUnmount`
      )
      ipcRenderer.removeAllListeners(channel)
    }
  }, [])
  const sendToMainProcess = useCallback(() => {
    ipcRenderer.send('childProcessMessage', '我是来自子进程的消息')
  }, [])
  const openNewWindow = useCallback(() => {
    // electron 帮我们封装了 remote 模块，可以使用 remote 模块自动发消息访问主进程 API
    const window = new BrowserWindow({ width: 600, height: 600 })
    window.loadURL('https://www.baidu.com')
  }, [])
  const sendNotification = useCallback(() => {
    const notification = new Notification('我是标题', {
      body: '我是通知内容'
    })
    notification.onclick = () => {
      console.log('通知被点击')
    }
  }, [])

  return (
    <>
      <Card title="Electron 案例">
        <h2>进程间通信</h2>
        <div>主进程消息：{mainProcessMessage}</div>
        <Button type="primary" onClick={sendToMainProcess}>
          发送消息到主进程
        </Button>
        <Button type="primary" onClick={openNewWindow}>
          打开新窗口
        </Button>
        <h2>系统 API</h2>
        <Button type="primary" onClick={sendNotification}>
          发送系统通知
        </Button>
      </Card>
    </>
  )
}

export default ElectronDemo
