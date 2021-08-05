import React, { useCallback } from 'react'
import { Button, Card } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { CounterActionType, RootState } from './models'
import Loading from '../loading'

const ReduxThunkHook = () => {
  const count = useSelector<RootState, number>(state => state.counter.count)
  const followers = useSelector<RootState, number>(
    state => state.counter.followers
  )
  const loading = useSelector<RootState, boolean>(
    state =>
      !!state.loading.effects[CounterActionType.delayIncrementWithNumType] ||
      !!state.loading.effects[CounterActionType.getUserInfoType]
  )
  const dispatch = useDispatch()
  const decrement = useCallback(
    () => dispatch(CounterActionType.decrementAction()),
    [dispatch]
  )
  const increment = useCallback(
    () => dispatch(CounterActionType.incrementAction()),
    [dispatch]
  )
  const delayIncrementWithNum = useCallback(
    (num: number) =>
      dispatch(CounterActionType.delayIncrementWithNumAction(num)),
    [dispatch]
  )
  const getUserInfo = useCallback(
    () => dispatch(CounterActionType.getUserInfoAction()),
    [dispatch]
  )

  return (
    <>
      <Card
        title="Redux-Dva-Hook"
        extra={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Button type="primary" onClick={decrement}>
              减1
            </Button>
            <Button type="primary" onClick={() => delayIncrementWithNum(-10)}>
              减10
            </Button>
            <Button type="primary" onClick={increment}>
              加1
            </Button>
            <Button type="primary" onClick={() => delayIncrementWithNum(10)}>
              加10
            </Button>
            <Button type="primary" onClick={getUserInfo}>
              获取个人信息
            </Button>
          </div>
        }
      >
        counter:{count} followers:{followers}
      </Card>
      <Loading visible={loading} />
    </>
  )
}
export default ReduxThunkHook
