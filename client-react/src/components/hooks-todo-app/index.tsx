import React from 'react'
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home'
import Login from './pages/Login'
import {
  AuthRoute,
  withAuthContextProvider,
  AuthContextProvider
} from './utils/auth'

const queryClient = new QueryClient()

const HooksTodoApp = (props: RouteComponentProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Switch>
          <Route path={`${props.match.path}/login`} component={Login} />
          <AuthRoute path={`${props.match.path}/home`} component={Home} />
          <Route component={Login} />
        </Switch>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
// export default withAuthContextProvider(withRouter(HooksTodoApp))
export default withRouter(HooksTodoApp)
