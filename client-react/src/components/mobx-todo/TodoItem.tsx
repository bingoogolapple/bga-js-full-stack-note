import React from 'react'
import { Button, Checkbox } from 'antd'
import { Todo } from '../../types'
import TodoViewModel from './TodoViewModel'

interface IProps {
  todo: Todo
  viewModel: TodoViewModel
}

//  无状态，木偶组件
export default class TodoItem extends React.Component<IProps> {
  _onCheckedChanged = () => {
    this.props.viewModel.switchTodoStatus(this.props.todo)
  }

  _onClickDelete = () => {
    this.props.viewModel.updateDeleteTodo(this.props.todo)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          margin: '10px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Checkbox
          style={
            this.props.todo.finished ? { textDecoration: 'line-through' } : {}
          }
          checked={this.props.todo.finished}
          onChange={this._onCheckedChanged}
        >
          {this.props.todo.title}
        </Checkbox>
        <Button danger onClick={this._onClickDelete}>
          删除
        </Button>
      </div>
    )
  }
}
