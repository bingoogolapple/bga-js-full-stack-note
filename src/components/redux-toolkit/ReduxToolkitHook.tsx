import React, { useCallback } from 'react'
import { Button, Card } from 'antd'

import { useAppDispatch, useAppSelector } from './store'
import Loading from '../loading'
import {
  selectCount,
  selectFollowers,
  delayIncrementWithNumAction,
  getUserInfoAction,
  decrement as decrementAction,
  increment as incrementAction
} from './store/counter'

const ReduxThunkHook = () => {
  const count = useAppSelector<number>(selectCount)
  const followers = useAppSelector<number>(selectFollowers)
  const loading = useAppSelector<boolean>(state => state.counter.loading)
  const dispatch = useAppDispatch()
  const decrement = useCallback(() => dispatch(decrementAction()), [dispatch])
  const increment = useCallback(() => dispatch(incrementAction(1)), [dispatch])
  const delayIncrementWithNum = useCallback(
    (num: number) => dispatch(delayIncrementWithNumAction(num)),
    [dispatch]
  )
  const getUserInfo = useCallback(
    () => dispatch(getUserInfoAction()),
    [dispatch]
  )

  return (
    <>
      <Card
        title="Redux-Toolkit-Hook"
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
