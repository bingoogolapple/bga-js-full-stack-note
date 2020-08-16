import React from 'react'
import './App.css'
import {
  HashRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'

import TodoListMobx from './components/mobx-todo'
import TodoListState from './components/state-todo'
import TodoListHooks from './components/hooks-todo'
import HooksDemo from './components/hooks-demo'
import MainWindowDemo from './components/electron-demo/MainWindowDemo'
import ChildWindowDemo from './components/electron-demo/ChildWindowDemo'
import ControlWindowDemo from './components/electron-demo/ControlWindowDemo'

class App extends React.Component {
  render() {
    return (
      <HashRouter hashType="noslash">
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/electronDemo">ElectronDemo</Link>
              </li>
              <li>
                <Link to="/todoListDemo">TodoListDemo</Link>
              </li>
            </ul>
          </nav> */}

          <Switch>
            <Route path="/electronDemo">
              <ElectronDemoRouter />
            </Route>
            <Route path="/todoListDemo">
              <TodoListDemoRouter />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

const TodoListDemoRouter: React.FC = () => {
  let match = useRouteMatch()

  return (
    <div>
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

const ElectronDemoRouter: React.FC = () => {
  let match = useRouteMatch()

  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to={`${match.path}/mainWindow`}>主窗口</Link>
          </li>
          <li>
            <Link to={`${match.path}/childWindow`}>子窗口</Link>
          </li>
          <li>
            <Link to={`${match.path}/controlWindow`}>控制窗口</Link>
          </li>
        </ul>
      </nav> */}

      <Switch>
        <Route path={`${match.path}/mainWindow`}>
          <MainWindowDemo />
        </Route>
        <Route path={`${match.path}/childWindow`}>
          <ChildWindowDemo />
        </Route>
        <Route path={`${match.path}/controlWindow`}>
          <ControlWindowDemo />
        </Route>
        <Route path={match.path}>
          <h3>请选择一个 Electron 案例</h3>
        </Route>
      </Switch>
    </div>
  )
}

export default App
