import React, { useCallback, useEffect } from 'react'
import { Button, Card } from 'antd'

const { remote } = window.require('electron')
// 引入 electron 中的对象
const {} = window.require('electron').remote

const Demo: React.FC = () => {
  useEffect(() => {
    // TODO
    return () => {
      // TODO
    }
  }, [])

  const click = useCallback(() => {
    // TODO
  }, [])

  return (
    <Card title="Electron 案例">
      <Button onClick={click}>点击</Button>
    </Card>
  )
}

export default Demo
