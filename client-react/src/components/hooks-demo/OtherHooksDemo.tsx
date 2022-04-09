import React, {
  useState,
  useCallback,
  useReducer,
  memo,
  useRef,
  useEffect,
  useMemo
} from 'react'
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

// 创建一个自定义 Hook 用于执行一次性代码
export const useSingleton = (callback: Function) => {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false)
  // 如果已经执行过，则直接返回
  if (called.current) return
  // 第一次调用时直接执行
  callback()
  // 设置标记为已执行过
  called.current = true
}

// 把业务逻辑提取出来成为一个 Hook
export const useCounter = () => {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0)
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(count + 1), [count])
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(count - 1), [count])
  // 重置计数器
  const reset = useCallback(() => setCount(0), [])

  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement, reset }
}

// 利用了 Hooks 能够管理 React 组件状态的能力，将一个组件中的某一部分状态独立出来，从而实现了通用逻辑的重用
export const useAsync = <T,>(asyncFunction: Function) => {
  // 设置三个异步逻辑相关的 state
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  // 定义一个 callback 用于执行异步逻辑
  const execute = useCallback(() => {
    // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
    setLoading(true)
    setData(null)
    setError(null)
    return asyncFunction()
      .then((response: T) => {
        // 请求成功时，将数据写进 state，设置 loading 为 false
        setData(response)
        setLoading(false)
      })
      .catch((error: Error) => {
        // 请求失败时，设置 loading 为 false，并设置错误状态
        setError(error)
        setLoading(false)
      })
  }, [asyncFunction])

  return { execute, loading, data, error }
}
export const useArticles = () => {
  // 使用上面创建的 useAsync 获取文章列表
  const { execute, data, loading, error } = useAsync(
    useCallback(async () => {
      const res = await fetch('url地址')
      return await res.json()
    }, [])
  )
  // 执行异步调用
  useEffect(() => execute(), [execute])
  // 返回语义化的数据结构
  return {
    articles: data,
    articlesLoading: loading,
    articlesError: error
  }
}
// eslint-disable-next-line
const useFilteredArticles = (articles: any[], selectedCategory: string) => {
  // 实现按照分类过滤
  return useMemo(() => {
    if (!articles) return null
    if (!selectedCategory) return articles
    return articles.filter(article => {
      return article?.category?.name === selectedCategory
    })
  }, [articles, selectedCategory])
}

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: document.body.scrollLeft,
    y: document.body.scrollTop
  }
}
export const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition)
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition())
    }
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener('scroll', handler)
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener('scroll', handler)
    }
  }, [])
  return position
}
export const ScrollToTop = () => {
  const { y } = useScroll()
  const goTop = useCallback(() => {
    document.body.scrollTop = 0
  }, [])

  // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
  if (y > 300) {
    return (
      <Button
        style={{
          position: 'fixed',
          right: '10px',
          bottom: '10px'
        }}
        onClick={goTop}
      >
        回到顶部
      </Button>
    )
  }
  // 否则不 render 任何 UI
  return <></>
}

/**
 * 尽量将相关的逻辑做成独立的 Hooks，然后在函数组中使用这些 Hooks，通过参数传递和返回值让 Hooks 之间完成交互
 * 此时拆分逻辑的目的不一定是为了重用，而可以是仅仅为了业务逻辑的隔离。
 * 所以在这个场景下，我们不一定要把 Hooks 放到独立的文件中，而是可以和函数组件写在一个文件中。
 * 这么做的原因就在于，这些 Hooks 是和当前函数组件紧密相关的，所以写到一起，反而更容易阅读和理解
 */
