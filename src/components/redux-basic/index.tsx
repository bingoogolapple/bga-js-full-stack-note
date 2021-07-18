import React from 'react'
import { Provider } from 'react-redux'
import ReduxBasicNoProvider from './ReduxBasicWithoutProviderSingleReducer'
import ReduxBasicWithProviderSingleReducer from './ReduxBasicWithProviderSingleReducer'
import ReduxBasicWithProviderMultiReducer from './ReduxBasicWithProviderMultiReducer'
import ReduxBasicWithProviderMultiReducerHook from './ReduxBasicWithProviderMultiReducerHook'

import singleReducerStore from './store/counter/store'
import multiReducerStore from './store'

const ReduxBasic: React.FC = () => {
  return (
    <>
      <ReduxBasicNoProvider />
      <Provider store={singleReducerStore}>
        <ReduxBasicWithProviderSingleReducer />
      </Provider>
      <Provider store={multiReducerStore}>
        <ReduxBasicWithProviderMultiReducer />
        <ReduxBasicWithProviderMultiReducerHook />
      </Provider>
    </>
  )
}

export default ReduxBasic
