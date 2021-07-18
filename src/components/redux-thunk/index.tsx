import React from 'react'
import { Provider } from 'react-redux'
import AuthThunk from './AuthThunk'
import ReduxThunk from './ReduxThunk'
import ReduxThunkHook from './ReduxThunkHook'

import store from './store'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxThunk />
      <ReduxThunkHook />
      <AuthThunk />
    </Provider>
  )
}

export default ReduxBasic
