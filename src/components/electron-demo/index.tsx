import React from 'react'
import { Card } from 'antd'

import IPCDemo from './IPCDemo'
import WindowDemo from './WindowDemo'
import ContextMenuDemo from './ContextMenuDemo'
import SystemApiDemo from './SystemApiDemo'
import RemoteControlDemo from './RemoteControlDemo'

const ElectronDemo: React.FC = () => {
  return (
    <Card title="Electron 案例">
      <RemoteControlDemo />
      <SystemApiDemo />
      <ContextMenuDemo />
      <WindowDemo />
      <IPCDemo />
    </Card>
  )
}

export default ElectronDemo
