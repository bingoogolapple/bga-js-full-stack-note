import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter
} from 'react-router-dom'
import { RootState } from '../store/reducer'
import Navigator from './Navigator'

const LOGIN_PATH = '/reactDemo/reduxThunk/login'

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.auth.userInfo
  }
}
const connector = connect(mapStateToProps)

// 通过高阶组件实现鉴权。高阶组件就是一个函数，接收一个组件作为参数，返回一个新的组件
type RequireAuthProps = Partial<
  ConnectedProps<typeof connector> & RouteComponentProps
>
export const withRequireAuth = <P extends RequireAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class RequireAuth extends React.PureComponent<Partial<RequireAuthProps>> {
    componentWillMount() {
      if (!this.props.userInfo) {
        this.props.history?.push(LOGIN_PATH)
      }
    }

    componentWillUpdate(nextProps: RequireAuthProps) {
      if (!nextProps.userInfo) {
        this.props.history?.push(LOGIN_PATH)
      }
    }

    render() {
      return <WrappedComponent {...(this.props as P)} />
    }
  }
  return withRouter(connector(RequireAuth))
}

// 包一层 Route 来实现鉴权
type AuthRouteProps = ConnectedProps<typeof connector> & RouteProps
// class InnerAuthRoute extends React.PureComponent<AuthRouteProps> {
//   render() {
//     const { component: WrappedComponent, ...routeProps } = this.props
//     return (
//       <Route
//         {...routeProps}
//         render={props => {
//           if (routeProps.userInfo) {
//             if (WrappedComponent) {
//               return <WrappedComponent {...props} />
//             } else if (routeProps.render) {
//               return routeProps.render(props)
//             } else {
//               return <></>
//             }
//           } else {
//             return (
//               <Redirect
//                 to={{
//                   pathname: LOGIN_PATH,
//                   state: { from: props.location }
//                 }}
//               />
//             )
//           }
//         }}
//       />
//     )
//   }
// }

// const InnerAuthRoute: React.FC<AuthRouteProps> = ({
//   component: WrappedComponent,
//   ...routeProps
// }) => {
const InnerAuthRoute = ({
  component: WrappedComponent,
  ...routeProps
}: AuthRouteProps) => {
  return (
    <Route
      {...routeProps}
      render={props => {
        if (routeProps.userInfo) {
          if (WrappedComponent) {
            return <WrappedComponent {...props} />
          } else if (routeProps.render) {
            return routeProps.render(props)
          } else {
            return <></>
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: LOGIN_PATH,
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}
export const AuthRoute = connector(InnerAuthRoute)

export const BindRouter = withRouter(({ history }: RouteComponentProps) => {
  Navigator.getInstance().setup(history)
  return <></>
})
