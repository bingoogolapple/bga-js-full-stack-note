import React from 'react'
import { ThemeContext } from './theme'
import { Card, Button } from 'antd'
import { UserInfoWithFetch, UserInfoWithLoading } from './withLoading'

export interface IProps {
  like: number
}
interface IState {
  count: number
}
export default class ClassDemo extends React.Component<IProps, IState> {
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
        <div>
          <UserInfoWithFetch />
          <UserInfoWithLoading />
        </div>
      </Card>
    )
  }
}
