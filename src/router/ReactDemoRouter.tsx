import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import TodoListMobx from '../components/mobx-todo'
import TodoListState from '../components/state-todo'
import TodoListHooks from '../components/hooks-todo'
import HooksDemo from '../components/hooks-demo'
import ReduxBasic from '../components/redux-basic'
import ReduxThunk from '../components/redux-thunk'
import ReactBasic from '../components/react-basic'
import RouterDemo from '../components/router-demo'
import AnimationDemo from '../components/animation-demo'

const ReactDemoNav: React.FC = () => {
  let match = useRouteMatch()

  return (
    <nav>
      <ul>
        <li>
          <Link to={`${match.path}/todoListState`}>TodoListState</Link>
        </li>
        <li>
          <Link to={`${match.path}/todoListRedux`}>TodoListRedux</Link>
        </li>
        <li>
          <Link to={`${match.path}/todoListMobx`}>TodoListMobx</Link>
        </li>
        <li>
          <Link to={`${match.path}/todoListHooks`}>TodoListHooks</Link>
        </li>
        <li>
          <Link to={`${match.path}/hooksDemo`}>Hooks Demo</Link>
        </li>
        <li>
          <Link to={`${match.path}/reactBasic`}>ReactBasic</Link>
        </li>
        <li>
          <Link to={`${match.path}/reduxBasic`}>ReduxBasic</Link>
        </li>
        <li>
          <Link to={`${match.path}/reduxThunk`}>ReduxThunk</Link>
        </li>
        <li>
          <Link to={`${match.path}/routerDemo`}>RouterDemo</Link>
        </li>
        <li>
          <Link to={`${match.path}/animationDemo`}>AnimationDemo</Link>
        </li>
      </ul>
    </nav>
  )
}

const ReactDemoRouter: React.FC = () => {
  let match = useRouteMatch()

  return (
    <div>
      <ReactDemoNav />

      <Switch>
        <Route path={`${match.path}/todoListState`} component={TodoListState} />
        <Route path={`${match.path}/todoListMobx`} component={TodoListMobx} />
        <Route path={`${match.path}/todoListHooks`} component={TodoListHooks} />
        <Route path={`${match.path}/reactBasic`} component={ReactBasic} />
        <Route path={`${match.path}/reduxBasic`} component={ReduxBasic} />
        <Route path={`${match.path}/reduxThunk`} component={ReduxThunk} />
        <Route path={`${match.path}/hooksDemo`} component={HooksDemo} />
        <Route path={`${match.path}/routerDemo`} component={RouterDemo} />
        <Route path={`${match.path}/animationDemo`} component={AnimationDemo} />
        <Route>
          <h3>请选择一个 React 案例</h3>
        </Route>
      </Switch>
    </div>
  )
}

export default ReactDemoRouter
