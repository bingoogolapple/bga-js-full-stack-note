import React from 'react'
import { Modal } from 'antd'
import TodoViewModel from './TodoViewModel'
import { observer, inject } from 'mobx-react'
import { trace } from 'mobx'

interface IProps {
  providerViewModel?: TodoViewModel
}

// 装饰器是从下往上调用的，@inject 必须要写在 @observer 的上面
@inject('providerViewModel')
@observer
class ConfirmDeleteTodoDialog extends React.Component<IProps> {
  _hideConfirmDeleteTodoDialog = () => {
    this.props.providerViewModel?.updateDeleteTodo(undefined)
  }

  render() {
    trace()

    if (!this.props.providerViewModel?.deleteTodo) {
      return <></>
    }
    return (
      <Modal
        title="提示"
        visible={true}
        onOk={this.props.providerViewModel?.handleDeleteTodo}
        onCancel={this._hideConfirmDeleteTodoDialog}
        okText="确认"
        cancelText="取消"
      >
        确认删除 {this.props.providerViewModel?.deleteTodo?.title} 吗
      </Modal>
    )
  }
}

export default ConfirmDeleteTodoDialog
