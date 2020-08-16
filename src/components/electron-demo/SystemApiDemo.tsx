import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card } from 'antd'

const fs = window.require('fs')
const { remote } = window.require('electron')
// 引入 electron 中的对象
const { Notification, dialog, clipboard } = window.require('electron').remote

const SystemApiDemo: React.FC = () => {
  const [imagePath, setImagePath] = useState('')
  const openDialog = useCallback(async () => {
    let result = await dialog.showOpenDialog(remote.getCurrentWindow(), {
      title: '我是标题',
      message: '我是消息',
      buttonLabel: '确认选择',
      properties: ['openFile'],
      filters: [{ name: '图片', extensions: ['jpg', 'png', 'jpeg'] }],
      defaultPath: 'avatar.png'
    })
    console.log(result)
    if (!result.canceled) {
      setImagePath(result.filePaths[0])
    }
  }, [])
  const saveDialog = useCallback(async () => {
    let result = await dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: '我是标题',
      message: '我是消息',
      buttonLabel: '确认选择',
      defaultPath: 'bga.txt'
    })
    console.log(result)
    if (!result.canceled) {
      fs.writeFileSync(result.filePath!, '我是文本内容')
    }
  }, [])

  const showMessageBox = useCallback(async () => {
    let result = await dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'info',
      title: '我是标题',
      message: '我是消息',
      detail: '我是详细信息',
      checkboxLabel: '是否选中',
      checkboxChecked: true,
      buttons: ['按钮1', '按钮2']
    })

    console.log(result.checkboxChecked ? '选中' : '未选中')
    if (result.response === 0) {
      console.log('点击了按钮1')
    } else if (result.response === 1) {
      console.log('点击了按钮2')
    }
  }, [])

  const showErrorBox = useCallback(async () => {
    dialog.showErrorBox('我是标题', '我是内容')
  }, [])

  useEffect(() => {
    let onlineListener = (e: Event) => {
      e.preventDefault()
      console.log('联网', e)
    }
    let offlineListener = (e: Event) => {
      e.preventDefault()
      console.log('断网', e)
    }
    // 监听联网
    window.addEventListener('online', onlineListener)
    // 监听断网
    window.addEventListener('offline', offlineListener)

    return () => {
      window.removeEventListener('online', onlineListener)
      window.removeEventListener('offline', offlineListener)
    }
  }, [])

  const sendNotification = useCallback(() => {
    const notification = new Notification({
      title: '我是 invoke 标题',
      body: '我是 invoke 内容',
      closeButtonText: '停止',
      hasReply: false,
      actions: [{ text: '继续', type: 'button' }] // 应用已签署 并且将 NSUserNotificationAlertStyle 设置为在 info.plist 中提醒才会展示 action
    })
    notification.show()
    notification.on('action', (event, index) => {
      console.log('action 继续')
    })
    notification.on('close', event => {
      console.log('close 停止')
    })
    notification.on('click', event => {
      console.log('click')
    })
    notification.on('reply', (event, reply) => {
      console.log('reply', reply)
    })
  }, [])

  const writeToClipboard = useCallback(async () => {
    clipboard.writeText('我是被复制的内容')
  }, [])

  return (
    <Card title="系统 API">
      <Button onClick={openDialog}>选择文件{imagePath}</Button>
      <img src={imagePath} alt="图片信息" width="200" height="200" />
      <Button onClick={saveDialog}>保存文件</Button>
      <Button onClick={showMessageBox}>showMessageBox</Button>
      <Button onClick={showErrorBox}>showErrorBox</Button>
      <Button type="primary" onClick={sendNotification}>
        发送系统通知
      </Button>
      <Button type="primary" onClick={writeToClipboard}>
        复制到剪贴板
      </Button>
    </Card>
  )
}

export default SystemApiDemo
