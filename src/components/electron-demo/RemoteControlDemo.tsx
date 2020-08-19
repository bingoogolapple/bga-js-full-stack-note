import React, { useCallback, useEffect, useState } from 'react'
import { Card, Input, Tag } from 'antd'

const { ipcRenderer } = window.require('electron')
// 引入 electron 中的对象
// const {} = window.require('electron').remote

const { Search } = Input

const RemoteControlDemo: React.FC = () => {
  const [remoteCode, setRemoteCode] = useState('')
  const [localCode, setLocalCode] = useState('')
  const [controlText, setControlText] = useState('')

  useEffect(() => {
    const channel = 'control-state-changed'
    const handleControlState = (e: any, name: string, type: number) => {
      if (type === 1) {
        setControlText(`正在控制 ${name}`)
      } else {
        setControlText(`被 ${name} 控制中`)
      }
    }
    ipcRenderer.on(channel, handleControlState)

    const login = async () => {
      let localCode = await ipcRenderer.invoke('remoteControlLogin')
      setLocalCode(localCode)
    }
    login()

    return () => {
      ipcRenderer.removeListener(channel, handleControlState)
    }
  }, [])

  const startControl = useCallback(() => {
    ipcRenderer.invoke('startControl', remoteCode)
  }, [remoteCode])

  const updateRemoteCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('updateKeyword')
      let newRemoteCode = e.target.value
      setRemoteCode(newRemoteCode)
    },
    []
  )

  return (
    <Card title="远程控制案例">
      {controlText ? (
        <Tag color="blue">{controlText}</Tag>
      ) : (
        <>
          <div
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            你的控制码
            <Tag color="success">{localCode}</Tag>
          </div>
          <Search
            placeholder="请输入对方控制码"
            size="large"
            value={remoteCode}
            onChange={updateRemoteCode}
            enterButton="确认控制"
            onSearch={startControl}
          />
        </>
      )}
    </Card>
  )
}

export default RemoteControlDemo
