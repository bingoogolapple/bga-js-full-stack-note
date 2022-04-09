import React, { useCallback } from 'react'
import { Button, Card } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import * as counterActions from './store/counter/actionCreators'
import * as scoreActions from './store/score/actionCreators'
import { RootState } from './store/reducer'

const ReduxBasicWithProviderMultiReducerHook = () => {
  // const store = useStore<RootState>() // 不要在应用中这样使用，store 中 state 变化后不会自动触发当前组件更新

  const count = useSelector<RootState, number>(state => state.counter.count)
  const score = useSelector<RootState, number>(state => state.score.score)
  const dispatch = useDispatch()

  const decrement = useCallback(
    () => dispatch(counterActions.decrement()),
    [dispatch]
  )
  const increment = useCallback(
    () => dispatch(counterActions.increment()),
    [dispatch]
  )
  const decrementWithNum = useCallback(
    () => dispatch(counterActions.decrementWithNum(10)),
    [dispatch]
  )
  const incrementWithNum = useCallback(
    (num: number) => dispatch(counterActions.incrementWithNum(num)),
    [dispatch]
  )
  const incrementScoreWithNum = useCallback(
    () => dispatch(scoreActions.incrementWithNum(10)),
    [dispatch]
  )
  return (
    <Card
      title="Redux-Basic-Provider-MultiReducer-Hook"
      extra={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Button type="primary" onClick={decrement}>
            counter减1
          </Button>
          <Button type="primary" onClick={decrementWithNum}>
            counter减10
          </Button>
          <Button type="primary" onClick={increment}>
            counter加1
          </Button>
          <Button type="primary" onClick={() => incrementWithNum(10)}>
            counter加10
          </Button>
          <Button type="primary" onClick={incrementScoreWithNum}>
            score加10
          </Button>
        </div>
      }
    >
      counter:{count} score:{score}
    </Card>
  )
}
export default ReduxBasicWithProviderMultiReducerHook
