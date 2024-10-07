import { configureStore, createSlice, PayloadAction, Middleware } from "@reduxjs/toolkit"
import { Task, TaskState } from "./types"



const initialState: TaskState = {
    userId: null,
    userName: null,
    tasks: []
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetState(state) {
            Object.assign(state, initialState)
            localStorage.removeItem("reduxState")
            return state
        },
        addUserName(state, action: PayloadAction<string | null>) {
            state.userName = action.payload
        },
        addUserId(state, action: PayloadAction<string | null>) {
            state.userId = action.payload
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.unshift(action.payload)
        },
        removeTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(x => x.taskId !== action.payload)
        },
    },
})

const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action)
    const state = store.getState()

    localStorage.setItem("reduxState", JSON.stringify(state))

    return result
}

const { reducer } = taskSlice

const persistedStateString = localStorage.getItem("reduxState")
const persistedState = persistedStateString ? JSON.parse(persistedStateString) : undefined


const store = configureStore({
    reducer: {
        tasks: reducer
    },
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export const actions = taskSlice.actions
export default store