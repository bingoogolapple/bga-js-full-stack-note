import React from 'react'
import { Card } from 'antd'

import IPCDemo from './IPCDemo'
import WindowDemo from './WindowDemo'
import ContextMenuDemo from './ContextMenuDemo'
import SystemApiDemo from './SystemApiDemo'

const ElectronDemo: React.FC = () => {
  return (
    <Card title="Electron 案例">
      <SystemApiDemo />
      <ContextMenuDemo />
      <WindowDemo />
      <IPCDemo />
    </Card>
  )
}

export default ElectronDemo
