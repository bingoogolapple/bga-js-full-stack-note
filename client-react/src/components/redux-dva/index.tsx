import React from 'react'
import { Provider } from 'react-redux'
import AuthDva from './AuthDva'
import ReduxDva from './ReduxDva'
import ReduxDvaHook from './ReduxDvaHook'

import store from './models'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxDva />
      <ReduxDvaHook />
      <AuthDva />
    </Provider>
  )
}

export default ReduxBasic
