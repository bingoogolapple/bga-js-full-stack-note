import { Dispatch } from 'redux'
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

// 使用 thunk 之前，action 都是对象（上面的函数返回的都是对象）
// 使用 thunk 之后，action 可以是函数（可以返回函数）
export const delayDecrementWithNum = (num: number) => {
    return (dispatch: Dispatch<CounterAction>) => {
        setTimeout(() => {
            dispatch(decrementWithNum(num))
        }, 2000)
    }
}

export const updateFollowers = (followers: number): CounterAction => ({ type: 'updateFollowers', followers: followers })
export const updateLoading = (loading: boolean): CounterAction => ({ type: 'updateLoading', loading: loading })

export const getUserInfo = () => {
    return (dispatch: Dispatch<CounterAction>) => {
        dispatch(updateLoading(true))
        fetch('https://api.github.com/users/bingoogolapple')
            .then(res => res.json())
            .then(data => {
                // dispatch({ type: 'updateFollowers', followers: data.followers })
                dispatch(updateFollowers(data.followers))
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => dispatch(updateLoading(false)))
    }
}
