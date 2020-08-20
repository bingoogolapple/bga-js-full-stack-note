import React from 'react'
import { Button, Switch } from 'antd'
import { ThemeContext, themes, IThemeProps } from './theme'

import ClassDemo from './ClassDemo'
import HooksDemo from './HooksDemo'

interface IDemoProps {}
interface IDemoState {
  like: number
  showClass: boolean
  showHooks: boolean
  theme: IThemeProps
}
class Demo extends React.Component<IDemoProps, IDemoState> {
  constructor(props: Readonly<IDemoProps>) {
    super(props)
    this.state = {
      like: 0,
      showClass: true,
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
