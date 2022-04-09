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