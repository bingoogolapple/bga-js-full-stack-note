import React from 'react'
import { Provider } from 'react-redux'
import AuthThunk from './AuthThunk'
import ReduxThunk from './ReduxThunk'

import store from './store'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxThunk />
      <AuthThunk />
    </Provider>
  )
}

export default ReduxBasic
