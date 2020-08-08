import React from 'react'
import { Modal, Input } from 'antd'
import TodoViewModel from './TodoViewModel'
import { observer } from 'mobx-react'
import { trace } from 'mobx'

interface IProps {
  viewModel: TodoViewModel
}

@observer
class AddTodoDialog extends React.Component<IProps> {
  _updateEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.viewModel.updateAddTitle(e.target.value)
  }

  render() {
    trace()

    return (
      <Modal
        title="添加 TODO"
        visible={this.props.viewModel.addTodoDialogVisible}
        onOk={this.props.viewModel.handleAddTodo}
        onCancel={this.props.viewModel.hideAddTodoDialog}
      >
        <Input
          placeholder="请输入代办标题"
          allowClear
          value={this.props.viewModel.addTitle}
          onChange={this._updateEditTitle}
        />
      </Modal>
    )
  }
}

export default AddTodoDialog
