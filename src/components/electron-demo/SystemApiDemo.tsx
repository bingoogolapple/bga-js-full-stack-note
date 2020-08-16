import React, { useCallback } from 'react'
import { Button, Card } from 'antd'

// 引入 electron 中的对象
const { Notification } = window.require('electron').remote

const SystemApiDemo: React.FC = () => {
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

  return (
    <Card title="系统 API">
      <Button type="primary" onClick={sendNotification}>
        发送系统通知
      </Button>
    </Card>
  )
}

export default SystemApiDemo
