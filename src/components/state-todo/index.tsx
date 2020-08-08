import React from 'react'
import { Button, Card, Modal, Input, message, Empty, Tag } from 'antd'
import { Todo } from '../../types'

import TodoItem from './TodoItem'
import Loading from '../loading'

function mockHttpRequest<T>(timeout: number, handleData: () => T) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      const result = handleData()
      resolve(result)
    }, timeout)
  })
}

interface IProps {}
interface IState {
  todoList: Todo[]
  currentTodoList: Todo[]
  addTodoDialogVisible: boolean
  addTitle: string
  deleteTodo?: Todo
  loading: boolean
  keyword: string
  currentDate: Date
}

class TodoListState extends React.Component<IProps, IState> {
  timer?: NodeJS.Timeout

  constructor(props: IProps) {
    super(props)

    this.state = {
      todoList: [],
      currentTodoList: [],
      addTodoDialogVisible: false,
      addTitle: '',
      keyword: '',
      currentDate: new Date(),
      loading: false
    }
  }

  componentDidMount() {
    // 组件加载完毕，开启定时任务刷新时间
    this.timer = setInterval(() => {
      this.setState({ currentDate: new Date() })
    }, 1000)
    // 初始化数据
    this.loadData()
  }

  componentWillUnmount() {
    // 组件即将卸载，清除定时任务
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  loadData = () => {
    this.setState({ loading: true })
    mockHttpRequest(1000, () => {
      return [1, 2, 3, 4, 5].map(index => ({
        id: Math.random() * 100000000,
        title: `默认标题${index}`,
        finished: false
      }))
    })
      .then(todoList => {
        this.setState({
          todoList: todoList,
          currentTodoList: todoList,
          loading: false
        })
      })
      .catch(e => {
        console.log('获取代办列表失败', e)
        this.setState({ loading: false })
      })
  }

  showAddTodoDialog = () => {
    this.setState({ addTodoDialogVisible: true })
  }

  hideAddTodoDialog = () => {
    this.setState({ addTodoDialogVisible: false, addTitle: '' })
  }

  showConfirmDeleteDialog = (todo: Todo) => {
    this.setState({
      deleteTodo: todo
    })
  }

  handleAddTodoDialog = async () => {
    if (!this.state.addTitle) {
      message.error('代办标题不能为空')
      return
    }
    this.setState({ loading: true })

    try {
      let newTodoList = await mockHttpRequest(1000, () => {
        return [
          ...this.state.todoList,
          {
            id: Math.random() * 100000000,
            title: this.state.addTitle,
            finished: false
          }
        ]
      })

      let newCurrentTodoList = this.getNewCurrentTodoList(
        this.state.keyword,
        newTodoList
      )
      this.setState({
        addTodoDialogVisible: false,
        todoList: newTodoList,
        currentTodoList: newCurrentTodoList,
        addTitle: '',
        loading: false
      })
    } catch (e) {
      console.log('添加代办失败', e)
      this.setState({ loading: false })
    }
  }

  updateEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ addTitle: e.target.value })
  }

  updateKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = e.target.value
    let newCurrentTodoList = this.getNewCurrentTodoList(
      keyword,
      this.state.todoList
    )
    this.setState({ currentTodoList: newCurrentTodoList, keyword: keyword })
  }

  getNewCurrentTodoList = (keyword: string, todoList: Todo[]) => {
    let newCurrentTodoList: Todo[]
    if (keyword) {
      newCurrentTodoList = todoList.filter(
        item => item.title.indexOf(keyword) !== -1
      )
    } else {
      newCurrentTodoList = todoList
    }
    return newCurrentTodoList
  }

  get addTodoDialog() {
    return (
      <Modal
        title="添加 TODO"
        visible={this.state.addTodoDialogVisible}
        onOk={this.handleAddTodoDialog}
        onCancel={this.hideAddTodoDialog}
      >
        <Input
          placeholder="请输入代办标题"
          allowClear
          value={this.state.addTitle}
          onChange={this.updateEditTitle}
        />
      </Modal>
    )
  }

  hideConfirmDeleteTodoDialog = () => {
    this.setState({ deleteTodo: undefined })
  }

  handleDeleteTodo = async () => {
    this.setState({ loading: true })

    try {
      let newTodoList = await mockHttpRequest(1000, () => {
        return this.state.todoList.filter(
          todo => todo.id !== this.state.deleteTodo?.id
        )
      })

      let newCurrentTodoList = this.getNewCurrentTodoList(
        this.state.keyword,
        newTodoList
      )
      this.setState({
        todoList: newTodoList,
        currentTodoList: newCurrentTodoList,
        deleteTodo: undefined,
        loading: false
      })
    } catch (e) {
      console.log('删除代办失败', e)
      this.setState({ loading: false })
    }
  }

  get confirmDeleteTodoDialog() {
    if (!this.state.deleteTodo) {
      return <></>
    }
    return (
      <Modal
        title="提示"
        visible={true}
        onOk={this.handleDeleteTodo}
        onCancel={this.hideConfirmDeleteTodoDialog}
        okText="确认"
        cancelText="取消"
      >
        确认删除 {this.state.deleteTodo?.title} 吗
      </Modal>
    )
  }

  onCheckedChanged = async (todo: Todo) => {
    this.setState({ loading: true })

    try {
      let newTodoList = await mockHttpRequest(500, () => {
        todo.finished = !todo.finished
        return [...this.state.todoList]
      })

      this.setState({ todoList: newTodoList, loading: false })
    } catch (e) {
      console.log('修改代办状态失败', e)
      this.setState({ loading: false })
    }
  }

  get todoListComponent() {
    if (
      !this.state.currentTodoList ||
      this.state.currentTodoList.length === 0
    ) {
      return <Empty description="暂无数据" />
    }

    return this.state.currentTodoList.map(todo => (
      <TodoItem
        key={todo.id.toString()}
        todo={todo}
        onCheckedChanged={this.onCheckedChanged}
        onClickDelete={this.showConfirmDeleteDialog}
      />
    ))
  }

  render() {
    return (
      <>
        <Card
          title="React State 版 TODO 案例"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Tag style={{ alignSelf: 'center', marginRight: '50px' }}>
                {this.state.currentDate.toLocaleTimeString()}
              </Tag>
              <Input
                placeholder="根据代办标题进行过滤"
                allowClear
                value={this.state.keyword}
                onChange={this.updateKeyword}
                style={{ marginRight: '70px' }}
              />
              <Button type="primary" onClick={this.showAddTodoDialog}>
                添加 TODO
              </Button>
            </div>
          }
        >
          {this.todoListComponent}
        </Card>
        {this.addTodoDialog}
        {this.confirmDeleteTodoDialog}
        <Loading visible={this.state.loading} />
      </>
    )
  }
}

export default TodoListState
