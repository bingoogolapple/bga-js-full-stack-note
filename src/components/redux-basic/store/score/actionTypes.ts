import { Action } from 'redux'

export type ScoreActionType = 'incrementScore' | 'decrementScore'
export interface ScoreAction extends Action<ScoreActionType> {
    diffNum?: number
}