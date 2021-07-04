import { CounterAction } from "./actionTypes"

export const increment = (): CounterAction => ({
    type: 'increment'
})

export const decrement = (): CounterAction => ({
    type: 'decrement'
})

export const incrementWithNum = (num: number): CounterAction => ({
    type: 'increment',
    num
})

export const decrementWithNum = (num: number): CounterAction => ({
    type: 'decrement',
    num
})

export const delayDecrementWithNum = (num: number): CounterAction => ({
    type: 'delayDecrementWithNum',
    num
})

export const getUserInfo = (): CounterAction => ({
    type: 'getUserInfo'
})
export const updateFollowers = (followers: number): CounterAction => ({
    type: 'updateFollowers', followers: followers
})
export const updateLoading = (loading: boolean): CounterAction => ({
    type: 'updateLoading', loading: loading
})
