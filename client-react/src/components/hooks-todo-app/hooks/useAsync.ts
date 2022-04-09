import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from './useMountedRef'

interface State<D> {
    stat: 'idle' | 'loading' | 'error' | 'success'
    data: D | null
    error: Error | null
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => {
        if (mountedRef.current) {
            dispatch(...args)
        }
    }, [dispatch, mountedRef])
}

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => {
        return { ...state, ...action }
    }, {
        ...defaultInitialState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)
    // useState 直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    // run 用来触发异步请求
    const run = useCallback(async (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(() => {
            return () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            }
        })
        safeDispatch({ stat: 'loading' })
        try {
            const data = await promise
            setData(data)
            return data
        } catch (error) {
            // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
            setError(error)
            if (config.throwOnError) {
                return Promise.reject(error)
            }
            return error
        }
    }, [config.throwOnError, setData, setError, safeDispatch])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry 被调用时重新跑一遍 run，让 state 刷新一遍
        retry,
        ...state,
    }
}
