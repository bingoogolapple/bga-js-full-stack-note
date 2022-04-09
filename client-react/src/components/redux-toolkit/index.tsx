import React from 'react'
import { Provider } from 'react-redux'
import AuthToolkit from './AuthToolkit'
import ReduxToolkit from './ReduxToolkit'
import ReduxToolkitHook from './ReduxToolkitHook'

import { store } from './store'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxToolkit />
      <ReduxToolkitHook />
      <AuthToolkit />
    </Provider>
  )
}

export default ReduxBasic
