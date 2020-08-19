import React, { useState } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  NavLink,
  RouteComponentProps,
  Redirect,
  withRouter,
  Prompt,
  useParams
} from 'react-router-dom'
import querystring from 'querystring'
import url from 'url'

import './nav.css'
import { Button, Input } from 'antd'

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
          <NavLink to={`${match.path}/loginPage`}>去登录页面</NavLink>
        </li>
        <li>
          <NavLink to={`${match.path}/shoppingCartPage`}>购物车页面</NavLink>
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
        {/* 匹配 from 时自动跳转到 to 对应的页面 */}
        <Redirect
          from={`${match.path}/redirectRenderDemo`}
          to={`${match.path}/renderDemo`}
        />
        {/* 加上 ? 表示可选参数，不加 ? 时表示必须参数，如果没有传就会走到后续其他路由或 404 路由 */}
        <Route
          path={`${match.path}/testPathParam/:orderId?/:memberId`}
          component={TestPathParam}
        />
        <Route path={`${match.path}/loginPage`} component={LoginPage} />
        <Route
          path={`${match.path}/shoppingCartPage`}
          component={ShoppingCartPage}
        />
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
>> = props => {
  console.log('外层', props.match, props.location, props.history)
  const searchParams = new URLSearchParams(props.location.search)
  const queryParams = querystring.parse(props.location.search.substring(1)) // 第一个字符是问号，需要裁减调，否则解析出来的第一个 key 前面会有问号
  const queryParamsWithUrl = url.parse(props.location.search, true).query // 推荐用 url 模块来解析，会自动处理第一个字符为问号的情况

  return (
    <div>
      <h3>外层直接使用</h3>
      <div>订单ID：{props.match.params.orderId}</div>
      <div>会员ID：{props.match.params.memberId}</div>
      <div>search aa：{searchParams.get('aa')}</div>
      <div>search bb：{searchParams.get('bb')}</div>
      <div>query aa：{queryParams.aa}</div>
      <div>query bb：{queryParams.bb}</div>
      <div>{JSON.stringify(queryParamsWithUrl)}</div>
      <div>stateAa：{props.location.state?.stateAa}</div>
      <div>stateBb：{props.location.state?.stateBb}</div>
      <TestPathParamInner />
      <TestPathParamInnerWithRouter />
    </div>
  )
}

const TestPathParamInner: React.FC = props => {
  console.log('TestPathParamInner', props) // 此时的 props 是空的

  // 内层可以通过外层传递路由参数，也可以通过 useXxx 来获取
  const match = useRouteMatch<RouterParam>() // 获取路径参数和完整路径
  const location = useLocation<StateParam>() // 获取查询参数、隐藏参数和完整路径
  const history = useHistory<StateParam>() // 导航前进后退等，history 中也包含 location 属性
  const params = useParams<RouterParam>() // 获取路径参数
  const searchParams = new URLSearchParams(location.search)
  const queryParams = querystring.parse(location.search.substring(1))
  console.log('内层', match, location, history, params)

  return (
    <div>
      <h3>内层通过 useXxxx 使用</h3>
      <div>订单ID：{match.params.orderId}</div>
      <div>会员ID：{match.params.memberId}</div>
      <div>useParams订单ID：{params.orderId}</div>
      <div>useParams会员ID：{params.memberId}</div>
      <div>search aa：{searchParams.get('aa')}</div>
      <div>search bb：{searchParams.get('bb')}</div>
      <div>query aa：{queryParams.aa}</div>
      <div>query bb：{queryParams.bb}</div>
      <div>stateAa：{location.state?.stateAa}</div>
      <div>stateBb：{location.state?.stateBb}</div>
    </div>
  )
}

const TestPathParamInnerWith: React.FC<RouteComponentProps<
  RouterParam,
  any,
  StateParam
>> = props => {
  console.log('TestPathParamInnerWith', props)

  const searchParams = new URLSearchParams(props.location.search)
  const queryParams = querystring.parse(props.location.search.substring(1))

  return (
    <div>
      <h3>内层通过 withRouter 使用</h3>
      <div>订单ID：{props.match.params.orderId}</div>
      <div>会员ID：{props.match.params.memberId}</div>
      <div>search aa：{searchParams.get('aa')}</div>
      <div>search bb：{searchParams.get('bb')}</div>
      <div>query aa：{queryParams.aa}</div>
      <div>query bb：{queryParams.bb}</div>
      <div>stateAa：{props.location.state?.stateAa}</div>
      <div>stateBb：{props.location.state?.stateBb}</div>
    </div>
  )
}
// 通过 withRouter 包裹后 TestPathParamInnerWith 的属性就具有了路由属性
const TestPathParamInnerWithRouter = withRouter(TestPathParamInnerWith)

let isLogin = false

const LoginPage: React.FC<RouteComponentProps> = props => {
  const [username, setUsername] = useState('')

  return (
    <div>
      <h2>登录页面</h2>
      {/* message 既可以传文本，也可以传回调函数 */}
      {/* <Prompt message="已输入用户名，确认取消登录吗？" when={!!username} /> */}
      <Prompt
        message={(location, action) => {
          console.log(location)
          console.log(action)
          // 如果返回文本内容则弹出确认、取消对话框
          return '已输入用户名，确认取消登录吗？'
          // 如果返回 true 则直接离开当前路由
          //   return true
          // 如果返回 false 则继续停留在当前路由，并且不会弹确认取消对话框
          //   return false

          // when 为可选参数
        }}
        when={!!username}
      />
      <Input value={username} onChange={e => setUsername(e.target.value)} />
      <Button
        onClick={() => {
          isLogin = true
          props.history.push('/routerDemo/shoppingCartPage')
        }}
      >
        登录
      </Button>
      <Button
        onClick={() => {
          props.history.goForward()
        }}
      >
        前进
      </Button>
    </div>
  )
}

const ShoppingCartPage: React.FC<RouteComponentProps> = props => {
  if (!isLogin) {
    // 不指定 from 时，会直接跳转到 to
    return <Redirect to={'/routerDemo/loginPage'} />
  }
  return (
    <div>
      <h2>购物车页面</h2>
      <Button
        onClick={() => {
          isLogin = false
          // 替换路由，上一次的页面销毁。参数支持字符串和对象两种形式
          props.history.replace('/routerDemo/loginPage')
        }}
      >
        退出，去登录页面
      </Button>
      <Button
        onClick={() => {
          // 新增页面，上一次的页面还存在。参数支持字符串和对象两种形式
          props.history.push('/routerDemo/loginPage')
        }}
      >
        不退出，去登录页面
      </Button>
      <Button
        onClick={() => {
          props.history.goBack()
        }}
      >
        后退
      </Button>
    </div>
  )
}

export default RouterDemo
