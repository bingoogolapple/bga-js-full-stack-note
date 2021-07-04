import { call, put, delay, takeEvery } from 'redux-saga/effects'
import { decrementWithNum, updateFollowers, updateLoading } from "./actionCreators"
import { CounterAction } from './actionTypes'

function* getUserInfo() {
    try {
        yield put(updateLoading(true))
        const res = yield call(fetch, 'https://api.github.com/users/bingoogolapple')
        console.log('个人信息', res)
        const data = yield call([res, res.json])
        console.log('数据', data)
        const action = updateFollowers(data.followers)
        yield put(action)
    } catch (e) {
        console.error(e)
    } finally {
        yield put(updateLoading(false))
    }
}

function* delayDecrementWithNum(action: CounterAction) {
    try {
        yield put(updateLoading(true))
        yield delay(3000)
        yield put(decrementWithNum(action.num!))
    } catch (e) {
        console.error(e)
    } finally {
        yield put(updateLoading(false))
    }
}

export default function* sagas() {
    yield takeEvery('getUserInfo', getUserInfo)
    yield takeEvery('delayDecrementWithNum', delayDecrementWithNum)
}
