import { combineReducers } from 'redux'

// 引入笔记本
import counter, { CounterState } from './counter/reducer'
import score, { ScoreState } from './score/reducer'

const rootReducer = combineReducers({ counter, score })

export type RootState = {
    counter: CounterState,
    score: ScoreState
}

export default rootReducer
