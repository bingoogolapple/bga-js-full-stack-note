import React from 'react'
import { Button, Checkbox } from 'antd'
import { Todo } from '../../types'
interface IProps {
  todo: Todo
  onCheckedChanged: (todo: Todo) => void
  onClickDelete: (todo: Todo) => void
}

//  无状态，木偶组件
export default class TodoItem extends React.Component<IProps> {
  onCheckedChanged = () => {
    this.props.onCheckedChanged(this.props.todo)
  }

  onClickDelete = () => {
    this.props.onClickDelete(this.props.todo)
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
          onChange={this.onCheckedChanged}
        >
          {this.props.todo.title}
        </Checkbox>
        <Button danger onClick={this.onClickDelete}>
          删除
        </Button>
      </div>
    )
  }
}
