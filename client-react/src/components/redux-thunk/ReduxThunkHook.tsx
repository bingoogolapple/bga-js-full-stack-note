import React, { useCallback } from 'react'
import { Button, Card } from 'antd'

import { RootState } from './store/reducer'
import { useDispatch, useSelector } from 'react-redux'
import * as counterActions from './store/counter/actionCreators'
import Loading from '../loading'

const ReduxThunkHook = () => {
  const count = useSelector<RootState, number>(state => state.counter.count)
  const followers = useSelector<RootState, number>(
    state => state.counter.followers
  )
  const loading = useSelector<RootState, boolean>(
    state => state.counter.loading
  )
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
  const delayDecrementWithNum = useCallback(
    (num: number) => dispatch(counterActions.delayDecrementWithNum(num)),
    [dispatch]
  )
  const getUserInfo = useCallback(
    () => dispatch(counterActions.getUserInfo()),
    [dispatch]
  )

  return (
    <>
      <Card
        title="Redux-Thunk-Hook"
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
            <Button type="primary" onClick={decrementWithNum}>
              减10
            </Button>
            <Button type="primary" onClick={increment}>
              加1
            </Button>
            <Button type="primary" onClick={() => incrementWithNum(10)}>
              加10
            </Button>
            <Button type="primary" onClick={() => delayDecrementWithNum(10)}>
              延时减10
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
