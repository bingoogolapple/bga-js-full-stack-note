import { Action } from 'redux'

// 提取后使用常量，常量名写错时代码会报异常；如果是各自写了不相等字符串，程序业务异常，但不会报代码异常，不利于排查问题
// 使用 TypeScript 后可以不用再定义常量，直接定义类型即可并且会有提示
// export const INCREMENT = 'increment'
// export const DECREMENT = 'decrement'

export type CounterActionType = 'increment' | 'decrement' | 'updateFollowers' | 'updateLoading'
export interface CounterAction extends Action<CounterActionType> {
    num?: number
    followers?: number
    loading?: boolean
}