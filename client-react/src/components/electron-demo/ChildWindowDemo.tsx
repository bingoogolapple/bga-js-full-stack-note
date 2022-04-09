import React, { useState, useEffect, useCallback } from 'react'
import { Card, Tag, Button } from 'antd'
const { ipcRenderer, remote } = window.require('electron')

const ChildWindowDemo: React.FC = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const channel = 'MainWindowMessage'
    const listener = (
      event: Electron.IpcRendererEvent,
      mainWindowMessage: string
    ) => {
      console.log(event, mainWindowMessage)
      setMessage(mainWindowMessage)
    }
    ipcRenderer.on(channel, listener)
    return () => {
      ipcRenderer.removeListener(channel, listener)
    }
  }, [])

  const sendToMainWindow = useCallback(() => {
    let sharedObject = remote.getGlobal('sharedObject')
    ipcRenderer.sendTo(
      sharedObject.mainWindowWebContentsId,
      'MainWindowOnMessage',
      '我是来自子窗口的消息'
    )
  }, [])
  return (
    <Card title="子窗口案例">
      收到消息：<Tag color="success">{message}</Tag>
      <Button type="primary" onClick={sendToMainWindow}>
        发送消息给主窗口
      </Button>
    </Card>
  )
}

export default ChildWindowDemo
