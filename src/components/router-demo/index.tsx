import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  NavLink
} from 'react-router-dom'

import './nav.css'

const Nav: React.FC = () => {
  let match = useRouteMatch()
  let location = useLocation()
  let history = useHistory()
  console.log('也可以通过 use 取出相关路由属性', match, location, history)

  /**
   * 1、NavLink 选中后会有一个名叫 active 的样式，自定义该样式高亮显示
   * 2、也可以通过 activeClassName 来修改样式名称
   * 3、还可以通过 activeStyle 直接指定样式
   */

  return (
    <nav>
      <ul>
        <li>
          <NavLink activeClassName="selected" to={`${match.path}/renderDemo`}>
            renderDemo
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ color: 'red', fontWeight: 'bold' }}
            to={`${match.path}/1111`}
          >
            1111
          </NavLink>
        </li>
        <li>
          <NavLink to={`${match.path}/2222`}>2222</NavLink>
        </li>
        <li>
          <NavLink to={`${match.path}/3333`}>3333</NavLink>
        </li>
      </ul>
    </nav>
  )
}

const RouterDemo: React.FC = () => {
  let match = useRouteMatch()

  return (
    <div>
      <Nav />
      <Switch>
        <Route
          path={`${match.path}/renderDemo`}
          render={props => {
            console.log('路由属性', props)
            return <div>直接在 render 渲染</div>
          }}
        />
        <Route path={`${match.path}/1111`}>
          <div>1111</div>
        </Route>
        <Route path={`${match.path}/2222`}>
          <div>2222</div>
        </Route>
        <Route path={`${match.path}/3333`}>
          <div>3333</div>
        </Route>
      </Switch>
    </div>
  )
}

export default RouterDemo
