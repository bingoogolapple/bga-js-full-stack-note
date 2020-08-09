import {
  observable,
  configure,
  action,
  computed,
  runInAction,
  trace
} from 'mobx'
import { Todo } from '../../types'
import { BaseViewModel } from './platform/viewmodel/BaseViewModel'
// a、通过 configure({ enforceActions: "observed" }) 开启严格模式后必须在 action 中修改状态
configure({ enforceActions: 'observed' })

function mockHttpRequest<T>(timeout: number, handleData: () => T) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      const result = handleData()
      resolve(result)
    }, timeout)
  })
}

export default class TodoViewModel extends BaseViewModel {
  @observable todoList: Todo[] = []
  @observable addTodoDialogVisible: boolean = false
  @observable addTitle: string = ''
  @observable deleteTodo?: Todo
  @observable keyword: string = ''
  @observable currentDate: Date = new Date()
  timer?: NodeJS.Timeout

  @computed
  get currentTodoList(): Todo[] {
    trace()
    let newCurrentTodoList: Todo[]
    if (this.keyword) {
      newCurrentTodoList = this.todoList.filter(
        item => item.title.indexOf(this.keyword) !== -1
      )
    } else {
      newCurrentTodoList = this.todoList
    }
    return newCurrentTodoList
  }

  @action.bound
  showAddTodoDialog() {
    this.addTitle = ''
    this.addTodoDialogVisible = true
  }

  @action.bound
  hideAddTodoDialog() {
    this.addTodoDialogVisible = false
  }

  @action.bound
  updateDeleteTodo(todo?: Todo) {
    this.deleteTodo = todo
  }

  @action.bound
  updateAddTitle(title: string) {
    this.addTitle = title
  }

  @action.bound
  updateKeyword(keyword: string) {
    this.keyword = keyword
  }

  // b、@action、@action.bound 装饰器只会对当前运行的函数作出反应，而不会对当前运行函数所调用的函数作出反应。例如 Promise then、async await
  @action.bound
  loadData() {
    this.showLoadingDialog()

    // 模拟 http 请求获取代办列表
    mockHttpRequest(1000, () => {
      return [1, 2, 3, 4, 5].map(index => ({
        id: Math.random() * 100000000,
        title: `默认标题${index}`,
        finished: false
      }))
    })
      .then(todoList => {
        // c1、通过 configure({ enforceActions: "observed" }) 开启严格模式后这样写会报错
        // this.todoList = todoList
        // c2、Promise then、catch、finally 里修改状态需要用 runInAction 包裹一下
        runInAction('loadData', () => {
          // 获取代办列表成功：更新列表（当前展示列表 currentTodoList 会自动重新计算）、关闭数据加载对话框
          this.todoList = todoList
        })
      })
      .catch(e => {
        console.log('获取代办列表失败', e)
      })
      .finally(() => {
        // 不管加载成功还是失败，都关闭加载中对话框
        this.dismissLoadingDialog()
      })
  }

  @action.bound
  async handleAddTodo() {
    // 展示加载中对话框
    this.showLoadingDialog()

    try {
      // 模拟 http 请求添加代办
      let newTodoList: Todo[] = await mockHttpRequest(1000, () => {
        return [
          ...this.todoList,
          {
            id: Math.random() * 100000000,
            title: this.addTitle,
            finished: false
          }
        ]
      })

      // d1、async 方法中 await 后修改状态也需要用 runInAction 包裹一下
      runInAction('handleAddTodo', () => {
        // 添加成功：更新列表（当前展示列表 currentTodoList 会自动重新计算）、关闭添加对话框
        this.todoList = newTodoList
        this.addTodoDialogVisible = false
      })
    } catch (e) {
      console.log('添加代办失败', e)
    } finally {
      // 不管添加成功还是添加失败，都关闭加载中对话框
      this.dismissLoadingDialog()
    }
  }

  @action.bound
  async handleDeleteTodo() {
    this.showLoadingDialog()

    try {
      let newTodoList = await mockHttpRequest(1000, () => {
        return this.todoList.filter(todo => todo.id !== this.deleteTodo?.id)
      })

      // d1、async 方法中 await 后修改状态也需要用 runInAction 包裹一下
      runInAction('handleDeleteTodo', () => {
        // 删除代办成功：更新列表（当前展示列表 currentTodoList 会自动重新计算）、置空待删除的代办来关闭删除确认对话框
        this.todoList = newTodoList
        this.deleteTodo = undefined
      })
    } catch (e) {
      console.log('删除代办失败', e)
    } finally {
      // 不管删除成功还是删除失败，都关闭加载中对话框
      this.dismissLoadingDialog()
    }
  }

  @action.bound
  async switchTodoStatus(todo: Todo) {
    this.showLoadingDialog()

    try {
      let newTodoList = await mockHttpRequest(500, () => {
        todo.finished = !todo.finished
        return [...this.todoList]
      })

      // d1、async 方法中 await 后修改状态也需要用 runInAction 包裹一下
      runInAction('switchTodoStatus', () => {
        this.todoList = newTodoList
      })
    } catch (e) {
      console.log('修改代办状态失败', e)
    } finally {
      // 不管修改成功还是修改失败，都关闭加载中对话框
      this.dismissLoadingDialog()
    }
  }

  @action.bound
  startUpdateDateTimer() {
    this.timer = setInterval(() => {
      runInAction('updateCurrentDate', () => {
        this.currentDate = new Date()
      })
    }, 1000)
  }

  @action.bound
  destroyUpdateDateTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }
}
