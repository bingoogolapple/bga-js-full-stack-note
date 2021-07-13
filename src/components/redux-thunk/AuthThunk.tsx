import React from 'react'
import { Button, Card } from 'antd'

import { RootState } from './store/reducer'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import Loading from '../loading'
import { AuthAction } from './store/auth/actionTypes'
import * as authActions from './store/auth/actionCreators'
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { AuthRoute, withRequireAuth } from './utils/withRequireAuth'

class AuthThunk extends React.Component<RouteComponentProps> {
  render() {
    // console.log('路由信息', this.props.location, this.props.match)
    return (
      <Switch>
        <Route path={`${this.props.match.path}/login`} component={Login} />
        <Route
          path={`${this.props.match.path}/userListWithRequireAuth`}
          component={RequireAuthUserList}
        />
        <AuthRoute
          path={`${this.props.match.path}/userListWithAuthRoute`}
          component={UserList}
        />
      </Switch>
    )
  }
}
export default withRouter(AuthThunk)

const userListConnector = connect(
  (state: RootState) => {
    return {
      userInfo: state.auth.userInfo,
      userInfos: state.auth.userInfos,
      loading: state.auth.loading
    }
  },
  (dispatch: Dispatch<AuthAction>) => {
    return {
      authActions: bindActionCreators(authActions, dispatch)
    }
  }
)
class UserListOrigin extends React.Component<
  ConnectedProps<typeof userListConnector>
> {
  componentDidMount() {
    this.props.authActions.list()
  }

  render() {
    console.log('渲染用户列表', this.props.userInfo)
    return (
      <>
        <Card
          title="用户列表"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <span>{this.props.userInfo?.username}</span>
              <Button
                type="primary"
                onClick={() => this.props.authActions.logout()}
              >
                退出登录
              </Button>
            </div>
          }
        >
          {JSON.stringify(this.props.userInfos)}
        </Card>
        <Loading visible={this.props.loading} />
      </>
    )
  }
}

const UserList = userListConnector(UserListOrigin)
// 使用 AuthRoute 更好些，withRequireAuth 方式在点击退出登录后还会触发 render 方法，此时读取到的 this.props.userInfo 为空
const RequireAuthUserList = userListConnector(withRequireAuth(UserListOrigin))

const loginConnector = connect(
  (state: RootState) => {
    return {
      userInfo: state.auth.userInfo,
      loading: state.auth.loading
    }
  },
  (dispatch: Dispatch<AuthAction>) => {
    return {
      authActions: bindActionCreators(authActions, dispatch)
    }
  }
)

class LoginOrigin extends React.Component<
  ConnectedProps<typeof loginConnector>
> {
  render() {
    if (this.props.userInfo) {
      return <Redirect to="/reactDemo/reduxThunk/userListWithRequireAuth" />
    }

    return (
      <>
        <Button
          type="primary"
          onClick={() => this.props.authActions.login('lisi', '111111')}
        >
          登录
        </Button>
        <Loading visible={this.props.loading} />
      </>
    )
  }
}

const Login = loginConnector(LoginOrigin)
