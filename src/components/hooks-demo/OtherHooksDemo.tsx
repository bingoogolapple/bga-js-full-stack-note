import React, { useState, useCallback, useReducer, memo } from 'react'
import { Card, Button } from 'antd'
import { IProps } from './ClassDemo'
import useInputValue from './useInputValue'
import useFetch from './useFetch'

const OtherHooksDemo: React.FC<IProps> = props => {
  return (
    <Card
      title="Other Hooks Demo"
      extra={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        ></div>
      }
    >
      <TodoList />
      <GitHubIssueList />
      <TestUseReducer />
    </Card>
  )
}

export default OtherHooksDemo

interface Todo {
  title: string
  desc: string
  password: string
}
const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const [data, setData] = useState(() => {
    // 回调函数方式返回初始化数据，只会执行一次，避免每次渲染都执行耗时操作来获取初始化值
    console.log('耗时操作')
    return '耗时操作后返回数据'
  })
  setInterval(() => {
    setData(data + 1) // 始终都是一开始的 data + 1，data 不会随着执行次数递增
    setData(preData => {
      // 也可以通过回调函数方式设置 useState 的值，这样拿到的 preData 始终是最新的
      return preData + 1 // data 会随着执行次数递增
    })
  }, 3000)

  const onSubmit = useCallback(
    (todo: Todo) => {
      console.log('提交表单', todo)
      setTodoList([todo, ...todoList])
    },
    [todoList]
  )
  return (
    <div>
      <TodoForm onSubmit={onSubmit} />
      {todoList.map((item, index) => {
        return (
          <div key={index}>
            {item.title},{item.desc}
          </div>
        )
      })}
      <Button onClick={() => setTodoList([])}>清空</Button>
    </div>
  )
}

interface ITodoFormProps {
  onSubmit: (todo: Todo) => void
}
/**
 * 1、memo 包装函数式组件，实现该组件具备 PureComponent 对比属性是否变化来判断是否需要刷新被包裹的组件
 * 2、memo 的第二个参数为可选的函数参数，自定义属性对比方式，返回 true 表示相等不刷新，返回 false 表示不相等要刷新
 */
const TodoForm: React.FC<ITodoFormProps> = memo(({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    },
    []
  )

  const { resetValue: resetDesc, ...desc } = useInputValue('')
  const { resetValue: resetPassword, ...password } = useInputValue('')

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    console.log('提交表单', e)
    onSubmit({ title, desc: desc.value, password: password.value })
    setTitle('')
    resetDesc()
    resetPassword()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="请输入代办名称"
        value={title}
        onChange={onChangeTitle}
      />
      {/**
       * 表单只有一个输入框时，点击回车会提交表单
       * 1、若表单只有一个输入框，可以不包含在 form 元素里
       * 2、再添加一个输入框，并加上 display: none 的属性
       */}
      <input type="desc" placeholder="请输入代办描述" {...desc} />
      <input type="password" placeholder="请输入密码" {...password} />
      <input type="submit" value="添加" />
    </form>
  )
})

const GitHubIssueList: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const nextPage = useCallback(() => {
    setPage(page + 1)
  }, [page])

  const [data, loading] = useFetch<any>(
    `https://api.github.com/search/issues?q=+state:open+repo:bingoogolapple/bingoogolapple.github.io&sort=created&order=desc&page=${page}&per_page=5`
  )
  console.log('渲染', data)

  return (
    <div>
      <Button onClick={nextPage}>下一页</Button>
      {loading ? (
        <div>loading</div>
      ) : (
        data?.items.map((item: any) => {
          return <div key={item.id}>{item.title}</div>
        })
      )}
    </div>
  )
}

// https://juejin.im/post/6844903817981460493
interface IState {
  count: number
}
const initialState: IState = { count: 0 }
function reducer(state: IState, action: string) {
  switch (action) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error(`未能识别的 action: ${action}`)
  }
}

const TestUseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      Count: {state.count}
      <Button onClick={() => dispatch('increment')}>加1</Button>
      <Button onClick={() => dispatch('decrement')}>减1</Button>
    </div>
  )
}
