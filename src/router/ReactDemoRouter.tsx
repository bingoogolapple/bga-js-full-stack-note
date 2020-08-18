import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import TodoListMobx from '../components/mobx-todo'
import TodoListState from '../components/state-todo'
import TodoListHooks from '../components/hooks-todo'
import HooksDemo from '../components/hooks-demo'

const ReactDemoNav: React.FC = () => {
  let match = useRouteMatch()

  return (
    <nav>
      <ul>
        <li>
          <Link to={`${match.path}/todoListState`}>TodoListState</Link>
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
        <Route path={`${match.path}/todoListState`}>
          <TodoListState />
        </Route>
        <Route path={`${match.path}/todoListMobx`}>
          <TodoListMobx />
        </Route>
        <Route path={`${match.path}/todoListHooks`}>
          <TodoListHooks />
        </Route>
        <Route path={`${match.path}/hooksDemo`}>
          <HooksDemo />
        </Route>
        <Route path={match.path}>
          <h3>请选择一个 Todo 案例</h3>
        </Route>
      </Switch>
    </div>
  )
}

export default ReactDemoRouter
