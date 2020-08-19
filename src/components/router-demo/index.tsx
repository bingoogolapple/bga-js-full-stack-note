import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  NavLink,
  RouteComponentProps
} from 'react-router-dom'
import querystring from 'querystring'

import './nav.css'

const Nav: React.FC = () => {
  let match = useRouteMatch()

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
            直接在通过 render 属性渲染
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ color: 'red', fontWeight: 'bold' }}
            to={`${match.path}/testPathParam/xxxx/yyyy?aa=11&bb=22`}
          >
            测试路径参数 to string
          </NavLink>
        </li>
        <li>
          {/* state 隐藏参数不会在 url 中展示 */}
          <NavLink
            activeStyle={{ color: 'red', fontWeight: 'bold' }}
            to={{
              pathname: '/routerDemo/testPathParam/xxxx/yyyy',
              search: '?aa=11&bb=22',
              state: { stateAa: '111', stateBb: '222' }
            }}
          >
            测试路径参数 to object
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
            // console.log('路由属性', props)
            return <div>直接在 render 渲染</div>
          }}
        />
        {/* 加上 ? 表示可选参数，不加 ? 时表示必须参数，如果没有传就会走到后续其他路由或 404 路由 */}
        <Route
          path={`${match.path}/testPathParam/:orderId?/:memberId`}
          component={TestPathParam}
        />
        <Route path={`${match.path}/2222`}>
          <div>2222</div>
        </Route>
        <Route path={`${match.path}/3333`}>
          <div>3333</div>
        </Route>
        <Route>404</Route>
      </Switch>
    </div>
  )
}

interface RouterParam {
  orderId: string
  memberId: string
}
interface StateParam {
  stateAa: string
  stateBb: string
}

const TestPathParam: React.FC<RouteComponentProps<
  RouterParam,
  any,
  StateParam
>> = param => {
  console.log('外层', param.match, param.location, param.history)
  const searchParams = new URLSearchParams(param.location.search)
  const queryParams = querystring.parse(param.location.search.substring(1))

  return (
    <div>
      <h3>外层直接使用</h3>
      <div>订单ID：{param.match.params.orderId}</div>
      <div>会员ID：{param.match.params.memberId}</div>
      <div>search aa：{searchParams.get('aa')}</div>
      <div>search bb：{searchParams.get('bb')}</div>
      <div>query aa：{queryParams.aa}</div>
      <div>query bb：{queryParams.bb}</div>
      <div>stateAa：{param.location.state?.stateAa}</div>
      <div>stateBb：{param.location.state?.stateBb}</div>
      <TestPathParamInner />
    </div>
  )
}

const TestPathParamInner: React.FC = () => {
  // 内层可以通过外层传递路由参数，也可以通过 useXxx 来获取
  const match = useRouteMatch<RouterParam>() // 获取路径参数和完整路径
  const location = useLocation<StateParam>() // 获取查询参数、隐藏参数和完整路径
  const history = useHistory<StateParam>() // 导航前进后退等，history 中也包含 location 属性
  const searchParams = new URLSearchParams(location.search)
  const queryParams = querystring.parse(location.search.substring(1))
  console.log('内层', match, location, history)

  return (
    <div>
      <h3>内层 useXxxx 使用</h3>
      <div>订单ID：{match.params.orderId}</div>
      <div>会员ID：{match.params.memberId}</div>
      <div>search aa：{searchParams.get('aa')}</div>
      <div>search bb：{searchParams.get('bb')}</div>
      <div>query aa：{queryParams.aa}</div>
      <div>query bb：{queryParams.bb}</div>
      <div>stateAa：{location.state?.stateAa}</div>
      <div>stateBb：{location.state?.stateBb}</div>
    </div>
  )
}

export default RouterDemo
