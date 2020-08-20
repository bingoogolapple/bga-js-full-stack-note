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
 *
 * 只在最顶层使用 Hook
 * 只在 React 函数中调用 Hook
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
