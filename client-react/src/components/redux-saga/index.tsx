import React from 'react'
import { Provider } from 'react-redux'
import ReduxSaga from './ReduxSaga'

import store from './store'

const ReduxBasic: React.FC = () => {
  return (
    <Provider store={store}>
      <ReduxSaga />
    </Provider>
  )
}

export default ReduxBasic
