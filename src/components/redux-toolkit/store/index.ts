import { configureStore } from "@reduxjs/toolkit"
import counter from './counter'
import auth from './auth'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const rootReducer = {
    counter: counter,
    auth: auth
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
