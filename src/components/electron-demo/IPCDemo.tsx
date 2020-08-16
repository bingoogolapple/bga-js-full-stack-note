import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card } from 'antd'

// 引入 electron 中的类型
import { IpcRendererEvent, BrowserWindow as BrowserWindowType } from 'electron'
// 引入 electron 中的对象
const { ipcRenderer, remote } = window.require('electron')
const { BrowserWindow } = window.require('electron').remote

const IPCDemo: React.FC = () => {
  const [sendOnMainProcessMessage, setSendOnMainProcessMessage] = useState('')
  const [
    invokeHandleMainProcessMessage,
    setInvokeHandleMainProcessMessage
  ] = useState('')
  useEffect(() => {
    let channel = 'MainWindowOnMessage'
    ipcRenderer.on(channel, (event: IpcRendererEvent, arg: string) => {
      console.log(event, arg)
      setSendOnMainProcessMessage(arg)
    })

    return () => {
      ipcRenderer.removeAllListeners(channel)
    }
  }, [])

  const sendToMainProcess = useCallback(() => {
    ipcRenderer.send(
      'SendOnChildProcessMessage',
      '我是来自子进程的 send 消息',
      '参数2'
    )
  }, [])

  const invokeToMainProcess = useCallback(async () => {
    console.log('invoke handle')
    let result: string = await ipcRenderer.invoke(
      'InvokeHandleChildProcessMessage',
      '我是来自子进程的 invoke 消息',
      '参数2'
    )
    console.log('InvokeHandleChildProcessMessage 结果', result)
    setInvokeHandleMainProcessMessage(result)
  }, [])

  const openNewWindow = useCallback(() => {
    // 【少用甚至不用】electron 帮我们封装了 remote 模块，可以使用 remote 模块自动发消息访问主进程 API
    let window: BrowserWindowType | undefined = new BrowserWindow({
      width: 600,
      height: 600
    })
    window.loadURL('https://www.baidu.com')
    window.on('closed', () => {
      window = undefined
    })
  }, [])

  const sendToOtherRendererProcess = useCallback(() => {
    let sharedObject = remote.getGlobal('sharedObject')
    ipcRenderer.sendTo(
      sharedObject.childWindowWebContentsId,
      'MainWindowMessage',
      '我是来自主窗口的消息'
    )
  }, [])

  return (
    <Card title="进程间通信">
      <Button type="primary" onClick={sendToMainProcess}>
        【不推荐】send 方法发送消息到主进程，on 接收主进程消息：
        {sendOnMainProcessMessage}
      </Button>

      <Button type="primary" onClick={invokeToMainProcess}>
        【推荐】invoke 方法发送消息到主进程，await 接收主进程消息：
        {invokeHandleMainProcessMessage}
      </Button>

      <Button type="primary" onClick={openNewWindow}>
        【少用甚至不用】remote 模块打开新窗口
      </Button>

      <Button type="primary" onClick={sendToOtherRendererProcess}>
        【渲染进程间通信】sendTo
      </Button>
    </Card>
  )
}

export default IPCDemo
