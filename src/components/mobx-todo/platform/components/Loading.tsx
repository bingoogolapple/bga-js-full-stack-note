import React from 'react'
import { Spin } from 'antd'
import { BaseViewModel } from '../viewmodel/BaseViewModel'
import { observer } from 'mobx-react'
interface IProps {
  viewModel: BaseViewModel
}
@observer
class Loading extends React.Component<IProps> {
  render() {
    return this.props.viewModel.loading ? (
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
        <Spin spinning={true} size="large" />
        <span style={{ marginLeft: 10 }}>
          {this.props.viewModel.loadingText || '加载中...'}
        </span>
      </div>
    ) : (
      <></>
    )
  }
}
export default Loading
