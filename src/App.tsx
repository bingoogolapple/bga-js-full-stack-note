import React, { Suspense, lazy } from 'react'
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import ReactDemoRouter from './router/ReactDemoRouter'
import Loading from './components/loading'
import { Tag } from 'antd'
import RouterDemo from './components/router-demo'

class App extends React.Component {
  get electronComponentType(): React.ComponentType {
    if (window.navigator.userAgent.indexOf('Electron') !== -1) {
      return lazy(() => import('./router/ElectronDemoRouter'))
    } else {
      return function () {
        return <Tag color="warning">非 Electron 环境</Tag>
      }
    }
  }

  render() {
    return (
      <HashRouter hashType="noslash">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/electronDemo">
            <Suspense fallback={<Loading visible />}>
              <this.electronComponentType />
            </Suspense>
          </Route>
          {/* <Route strict exact path="/reactDemo" component={ReactDemoRouter} /> */}
          <Route path="/reactDemo" component={ReactDemoRouter} />
          <Route path="/reactDemo/testExact">
            <ol>
              <li>
                如果外面没有包裹 Switch，会展示多个匹配路由。如果给 /reactDemo
                加上 exact 后，访问 /reactDemo/testExact 就不会展示 /reactDemo
                的内容
              </li>
              <li>如果外面有包裹 Switch，则只会展示第一个匹配的路由</li>
              <li>
                strict 表示启用严格模式，当其和 exact
                同时指定时，如果路由后面多了 / 也是匹配不了的，例如 /reactDemo/
                匹配不了 /reactDemo，不加 strict 时才可以
              </li>
              <li>
                如果是嵌套路由的话，不能给父路由添加 exact，否则无法匹配子路由
              </li>
            </ol>
          </Route>
          <Route path="/routerDemo" component={RouterDemo} />
          <Route>
            <div>404</div>
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}

const Nav: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/electronDemo">ElectronDemo</Link>
      </li>
      <li>
        <Link to="/reactDemo">ReactDemo</Link>
      </li>
      <li>
        <Link to="/reactDemo/testExact">TestExact</Link>
      </li>
      <li>
        <Link to="/routerDemo">RouterDemo</Link>
      </li>
    </ul>
  )
}

const Home: React.FC = () => {
  return <div>首页</div>
}

export default App
