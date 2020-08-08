import React from 'react'
import { Button, Card } from 'antd'
import { observer, Provider } from 'mobx-react'

import TodoViewModel from './TodoViewModel'
import CurrentDate from './CurrentDate'
import Loading from './platform/components/Loading'
import AddTodoDialog from './AddTodoDialog'
import ConfirmDeleteTodoDialog from './ConfirmDeleteTodoDialog'
import TodoList from './TodoList'
import SearchTodo from './SearchTodo'
import { trace } from 'mobx'

@observer
class TodoListMobx extends React.Component {
  viewModel = new TodoViewModel()

  componentDidMount() {
    // 组件加载完毕，开启定时任务刷新时间
    this.viewModel.startUpdateDateTimer()
    // 初始化数据
    this.viewModel.loadData()
  }

  componentWillUnmount() {
    // 组件即将卸载，清除定时任务
    this.viewModel.destroyUpdateDateTimer()
  }

  render() {
    trace()

    return (
      // Provider 不是必须的，给 Provider 设置 providerViewModel 属性后子组件中可以通过 @inject('providerViewModel') 动态注入 providerViewModel 属性
      <Provider providerViewModel={this.viewModel}>
        <Card
          title="Mobx 版 TODO 案例"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <CurrentDate viewModel={this.viewModel} />
              <SearchTodo viewModel={this.viewModel} />
              <Button type="primary" onClick={this.viewModel.showAddTodoDialog}>
                添加 TODO
              </Button>
            </div>
          }
        >
          <TodoList viewModel={this.viewModel} />
        </Card>
        <AddTodoDialog viewModel={this.viewModel} />
        <ConfirmDeleteTodoDialog />
        <Loading viewModel={this.viewModel} />
      </Provider>
    )
  }
}

export default TodoListMobx
