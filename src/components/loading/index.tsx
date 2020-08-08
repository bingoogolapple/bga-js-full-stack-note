import React from 'react'
import { Spin } from 'antd'
interface IProps {
  visible: boolean
}
export default class Loading extends React.Component<IProps> {
  render() {
    return this.props.visible ? (
      <div
        style={{
          zIndex: 9999,
          position: 'absolute',
          display: 'flex',
          top: 1,
          left: 1,
          right: 1,
          bottom: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spin spinning={this.props.visible} size="large" />
      </div>
    ) : (
      <></>
    )
  }
}
