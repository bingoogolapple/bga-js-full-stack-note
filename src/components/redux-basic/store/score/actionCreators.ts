import { ScoreAction } from "./actionTypes"

export const increment = (): ScoreAction => ({
    type: 'incrementScore'
})

export const decrement = (): ScoreAction => ({
    type: 'decrementScore'
})

export const incrementWithNum = (diffNum: number): ScoreAction => ({
    type: 'incrementScore',
    diffNum
})

export const decrementWithNum = (diffNum: number): ScoreAction => ({
    type: 'decrementScore',
    diffNum
})