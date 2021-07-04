import React from 'react'
import { Provider } from 'react-redux'
import ReduxThunk from './ReduxThunk'

import store from './store'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxThunk />
    </Provider>
  )
}

export default ReduxBasic
