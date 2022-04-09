import React from 'react'
import { Empty } from 'antd'
import TodoViewModel from './TodoViewModel'
import { observer } from 'mobx-react'
import TodoItem from './TodoItem'
import { trace } from 'mobx'

interface IProps {
  viewModel: TodoViewModel
}

@observer
class TodoList extends React.Component<IProps> {
  render() {
    trace()

    if (
      !this.props.viewModel.currentTodoList ||
      this.props.viewModel.currentTodoList.length === 0
    ) {
      return <Empty description="暂无数据" />
    }

    return this.props.viewModel.currentTodoList.map(todo => (
      <TodoItem
        key={todo.id.toString()}
        todo={todo}
        viewModel={this.props.viewModel}
      />
    ))
  }
}

export default TodoList
