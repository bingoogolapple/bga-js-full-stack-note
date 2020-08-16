import React, { useCallback, useEffect, useState } from 'react'
import { Card, Button } from 'antd'

const { remote } = window.require('electron')
// 引入 electron 中的对象
const { BrowserView, shell } = window.require('electron').remote

const WindowDemo: React.FC = () => {
  const [childMessage, setChildMessage] = useState('')

  const chromeOpenBaidu = useCallback((e: any) => {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }, [])
  const embedOpenBaidu = useCallback((e: any) => {
    e.preventDefault()
    let browserView = new BrowserView()
    remote.getCurrentWindow().setBrowserView(browserView)
    browserView.setBounds({ x: 500, y: 300, width: 300, height: 300 })
    browserView.webContents.loadURL(e.target.href)
  }, [])
  const windowOpen = useCallback((e: any) => {
    e.preventDefault()
    // window.open(e.target.href)

    let childWindow: Window | null = window.open('http://localhost:3000')
    setTimeout(() => {
      console.log('10s 后关闭', childWindow)
      childWindow?.close()
      childWindow = null
    }, 10000)
  }, [])
  const postMessage = useCallback((e: any) => {
    // 如果是被其他窗口打开，可以通过 window.opener.postMessage 发送消息给父窗口
    window.opener.postMessage('我是子窗口传递的消息')
  }, [])

  // 监听子窗口 postMessage 发送的消息
  useEffect(() => {
    const type = 'message'
    const listener = (e: any) => {
      console.log('子窗口消息', e)
      setChildMessage(e.data)
    }
    window.addEventListener(type, listener)
    return () => {
      window.removeEventListener(type, listener)
    }
  }, [])

  return (
    <Card title="Window">
      <a href="https://www.baidu.com">窗口内部打开百度</a>
      <br />
      <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        新窗口打开百度 target="_blank"
      </a>
      <br />
      <a onClick={windowOpen} href="https://www.baidu.com">
        新窗口打开当前页面获取消息 window.open
      </a>
      <br />
      <a onClick={chromeOpenBaidu} href="https://www.baidu.com">
        外部浏览器打开百度
      </a>
      <br />
      <a onClick={embedOpenBaidu} href="https://www.baidu.com">
        内嵌打开百度
      </a>
      {window.opener ? (
        <Button onClick={postMessage}>发送消息给父窗口</Button>
      ) : (
        <>{childMessage}</>
      )}
    </Card>
  )
}

export default WindowDemo
