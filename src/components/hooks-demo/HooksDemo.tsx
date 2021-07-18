import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './theme'
import { Card, Button } from 'antd'
import { IProps } from './ClassDemo'
import useLoading from './useLoading'
import { IUserInfo } from './withLoading'
import useMousePosition from './useMousePosition'

/**
 * https://zh-hans.reactjs.org/docs/hooks-reference.html
 * https://usehooks.com
 * https://github.com/rehooks/awesome-react-hooks
 * https://github.com/streamich/react-use
 * https://github.com/alibaba/hooks
 * https://codesandbox.io/s/20vzg
 *
 * Hook 规则 https://zh-hans.reactjs.org/docs/hooks-rules.html
 * 1、只在最顶层使用 Hook：不要在循环，条件或嵌套函数中调用 Hook
 * 2、只在 React 函数中调用 Hook：
 *   不要在普通的 JavaScript 函数中调用 Hook
 *   可以在 React 的函数组件中调用 Hook
 *   可以在自定义 Hook 中调用其他 Hook
 */

/**
 * 1、useCallback 是根据依赖(deps)缓存第一个入参的(callback)。useMemo 是根据依赖(deps)缓存第一个入参(callback)执行后的值
 * 2、useMemo一般用于密集型计算大的一些缓存，通过 useMemo 的依赖我们就可以只在指定变量值更改时才执行计算，从而达到节约内存消耗
 * const calcValue = React.useMemo(() => {
 *  return Array(100000).fill('').map(v => v // 大量计算)
 * }, [count])
 * 3、useCallback 的功能其实是可以用 useMemo 来实现的
 * const myEventHandler = useMemo(() => {
 * // 返回一个函数作为缓存结果
 * return () => {
 *  // 在这里进行事件处理
 * }
 * }, [dep1, dep2]);
 */

/**
 * 如何保证状态一致性？
 * 1、保证状态最小化。这个状态是必须的吗？是否能通过 useMemo + 计算得到呢？
 * 2、避免中间状态，确保唯一数据源。
 */

/**
 * 如果事件处理函数是传递给原生节点，那么不写 useCallback，也几乎不会有任何性能的影响。
 * 但是如果你使用的是自定义组件，或者一些 UI 框架的组件，那么回调函数还都应该用 useCallback 进行封装
 */

const HooksDemo: React.FC<IProps> = props => {
  // 初始值为 0，第一个为当前的 state 值，第二个是更新当前 state 的函数
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const didMountedRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  // const [position, setPosition] = useState({ x: 0, y: 0 })

  const position = useMousePosition()

  let decrementCount = () => {
    setTimeout(() => {
      // 闭包，countRef.current 始终是最新的，count 是上一次点击执行 decrementCount 时的值
      alert(`${countRef.current} - ${count}`)
    }, 2000)
    setCount(count - 1)
    countRef.current = count - 1
  }
  let incrementCount = () => {
    setCount(count + 1)
    countRef.current = count + 1
  }

  // useEffect 代表副作用，是在函数 render 完后执行，副作用一定是和当前 render 的结果没关系的，而只是 render 完之后做的一些额外的事情
  useEffect(() => {
    // 【组件加载完成时】或【第二个参数指定的属性或状态发生变更时】执行。不传第二个参数时每次属性或状态变更都会执行
    console.log(
      `a2、b2：不传传第二个参数时每次属性或状态变更都会执行 useEffect ${position.x}`
    )
    if (didMountedRef.current) {
      console.log('componentWillUpdate')
    } else {
      console.log('componentDidMount')
      didMountedRef.current = true
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
    return () => {
      // 【组件销毁时】或【下一次 useEffect 回调执行前】执行
      console.log(
        `a3：不传传第二个参数时每次属性或状态变更都会执行清除 ${position.x}`
      )
    }
  })
  console.log(`a1、b1：渲染前执行 ${position.x}`)
  // a1、a2、b1、a3、b2

  // useEffect(() => {
  //   console.log("like 发生变化，执行 useEffect，包含了 componentDidMount 和 componentWillUpdate")
  //   return () => {
  //     console.log("like 发生变化，执行清除，包含了 componentWillUnmount 和 componentWillUpdate")
  //   }
  // }, [props.like])

  // useEffect(() => {
  //   console.log(`第二个参数传 [] 时只会在组件第一次加载完成时执行 useEffect，类似于 componentDidMount`)
  //   let updateMouse = (e: MouseEvent) => {
  //     setPosition({ x: e.clientX, y: e.clientY })
  //   }
  //   document.addEventListener("click", updateMouse)
  //   return () => {
  //     console.log(`第二个参数传 [] 时只会在组件卸载时执行清除，类似于 componentWillUnmount`)
  //     document.removeEventListener("click", updateMouse)
  //   }
  // }, [])

  // like 发生变化时执行
  const [data, loading] = useLoading<IUserInfo>('https://www.baidu.com', [
    props.like
  ])

  const theme = useContext(ThemeContext)

  return (
    <Card
      title="Hooks Demo"
      extra={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Button
            style={{ background: theme.background, color: theme.color }}
            type="primary"
            onClick={decrementCount}
          >
            count 减 1
          </Button>
          <Button type="primary" onClick={incrementCount}>
            count 加 1
          </Button>
        </div>
      }
    >
      <input type="text" ref={inputRef} />
      count:{count},x:{position.x}, y:{position.y},like:{props.like}
      {loading || !data ? (
        <div>加载中...</div>
      ) : (
        <div>
          use name:{data.name},age{data.age}
        </div>
      )}
    </Card>
  )
}

export default HooksDemo
