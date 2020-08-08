import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, Card, Switch } from 'antd'
import useMousePosition from './useMousePosition'
// import withLoading, { IWithLoadingProps } from "./withLoading"
import useLoading from './useLoading'
import { ThemeContext, themes, IThemeProps } from './theme'

interface IProps {
  like: number
}
interface IState {
  count: number
}
class ClassDemo extends React.Component<IProps, IState> {
  static contextType = ThemeContext

  constructor(props: IProps) {
    super(props)
    this.state = { count: 0 }
  }

  // 组件加载完毕时执行
  componentDidMount() {
    console.log('执行了 componentDidMount')
    document.addEventListener('click', this.updateMouse)
    document.title = `${this.props.like} - ${this.state.count}`
  }

  // props 发生变更时执行
  UNSAFE_componentWillUpdate() {
    console.log('执行了 componentWillUpdate')
    document.title = `${this.props.like} - ${this.state.count}`
  }

  // 组件即将销毁时执行
  componentWillUnmount() {
    console.log('执行了 componentWillUnmount')
    document.removeEventListener('click', this.updateMouse)
  }

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 })
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  updateMouse = () => {
    console.log('ClassDemo updateMouse')
  }

  render() {
    // 指定了 contextType 静态变量后就可以通过 this.context 获得 Context 的 value
    let theme2 = this.context
    console.log('theme2', theme2)
    return (
      <Card
        title="class Demo"
        extra={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <ThemeContext.Consumer>
              {theme => {
                return (
                  <Button
                    style={{ background: theme.background, color: theme.color }}
                    type="primary"
                    onClick={this.decrementCount}
                  >
                    count 减 1
                  </Button>
                )
              }}
            </ThemeContext.Consumer>
            <Button type="primary" onClick={this.incrementCount}>
              count 加 1
            </Button>
          </div>
        }
      >
        {this.state.count}
      </Card>
    )
  }
}

interface IUserInfo {
  name: string
  age: number
}
// interface IUserInfoProps extends IWithLoadingProps<IUserInfo> {}
// const UserInfo: React.FC<IUserInfoProps> = ({ data }) => {
//   return (
//     <>
//       <div>name:{data.name}</div>
//       <div>age:{data.age}</div>
//     </>
//   )
// }

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

  // const WrappedUserInfo = withLoading<IUserInfo, IUserInfoProps>(
  //   UserInfo,
  //   "path"
  // )

  // like 发生变化时执行
  const [data, loading] = useLoading<IUserInfo>('/path/xxx', [props.like])

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
      count:{count},x:{position.x}, y:{position.y}
      {/* <WrappedUserInfo /> */}
      {loading || !data ? (
        <div>加载中...</div>
      ) : (
        <div>
          name:{data.name},age{data.age},like:{props.like}
        </div>
      )}
    </Card>
  )
}

interface IDemoProps {}
interface IDemoState {
  like: number
  showClass: boolean
  showHooks: boolean
  theme: IThemeProps
}
class Demo extends React.Component<IDemoProps, IDemoState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      like: 0,
      showClass: false,
      showHooks: true,
      theme: themes.light
    }
  }
  decrementLike = () => {
    this.setState({ like: this.state.like - 1 })
  }

  incrementLike = () => {
    this.setState({ like: this.state.like + 1 })
  }

  switchShowClass = () => {
    this.setState({ showClass: !this.state.showClass })
  }

  switchShowHooks = () => {
    this.setState({ showHooks: !this.state.showHooks })
  }

  switchTheme = () => {
    let newTheme =
      this.state.theme === themes.light ? themes.dark : themes.light
    this.setState({ theme: newTheme })
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          {this.state.showClass ? <ClassDemo like={this.state.like} /> : <></>}
          {this.state.showHooks ? <HooksDemo like={this.state.like} /> : <></>}
          <Button type="primary" onClick={this.decrementLike}>
            like 减 1
          </Button>
          <Button type="primary" onClick={this.incrementLike}>
            like 加 1
          </Button>
          <Switch
            checked={this.state.showClass}
            checkedChildren="显示Class"
            unCheckedChildren="隐藏Class"
            onChange={this.switchShowClass}
          />
          <Switch
            checked={this.state.showHooks}
            checkedChildren="显示Hooks"
            unCheckedChildren="隐藏Hooks"
            onChange={this.switchShowHooks}
          />
          <Switch
            checked={this.state.theme === themes.light}
            checkedChildren="light"
            unCheckedChildren="dark"
            onChange={this.switchTheme}
          />
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default Demo
