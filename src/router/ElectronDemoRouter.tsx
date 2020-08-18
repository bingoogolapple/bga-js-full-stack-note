import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import MainWindowDemo from '../components/electron-demo/MainWindowDemo'
import ChildWindowDemo from '../components/electron-demo/ChildWindowDemo'
import ControlWindowDemo from '../components/electron-demo/ControlWindowDemo'

const ElectronDemoNav: React.FC = () => {
  let match = useRouteMatch()

  return (
    <nav>
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
    </nav>
  )
}

const ElectronDemoRouter: React.FC = () => {
  let match = useRouteMatch()

  return (
    <div>
      <ElectronDemoNav />

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

export default ElectronDemoRouter
