import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch, RootState } from '.'

function delay<T>(timeout: number, handleData: () => T) {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            const result = handleData()
            resolve(result)
        }, timeout)
    })
}

// 这个 action 可以直接调用处理异步数据
export const getUserInfoAction = createAsyncThunk(
    "counter/getUserInfo", async () => {
        const res = await axios.get('https://api.github.com/users/bingoogolapple')
        // 此处的返回结果会作为 extraReducers 中的 payload
        return res.data.followers
    }
)


interface State {
    count: number
    followers: number
    loading: boolean
}
export const initialState: State = {
    count: 0,
    followers: 0,
    loading: false
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.count += action.payload
        },
        decrement: (state) => {
            state.count -= 1
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setFollowers: (state, action: PayloadAction<number>) => {
            state.followers = action.payload
        }
    },
    extraReducers: {
        // fulfilled 成功
        [getUserInfoAction.fulfilled.type](state, action: PayloadAction<number>) {
            console.log('获取数据成功')
            state.loading = false
            state.followers = action.payload
        },
        // rejected 失败
        [getUserInfoAction.rejected.type](state, error) {
            console.log('获取数据失败', error)
            state.loading = false
        },
        // pending 进行中
        [getUserInfoAction.pending.type](state) {
            console.log('获取数据中...')
            state.loading = true
        }
    }
})

export default counterSlice.reducer

export const selectCount = (state: RootState) => state.counter.count
export const selectFollowers = (state: RootState) => state.counter.followers
export const { increment, decrement, setLoading, setFollowers } = counterSlice.actions
export const delayIncrementWithNumAction = (num: number) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    return delay(1000, () => {
        return num
    }).then(num => {
        dispatch(setLoading(false))
        dispatch(increment(num))
    })
}
export const getUserInfoAction2 = () => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    return axios.get('https://api.github.com/users/bingoogolapple')
        .then((res => {
            const followers = res.data.followers
            dispatch(setLoading(false))
            dispatch(setFollowers(followers))
        })).catch(e => {
            dispatch(setLoading(false))
            throw e
        })
}