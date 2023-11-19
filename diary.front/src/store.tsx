import { configureStore, createSlice, PayloadAction, Middleware, getDefaultMiddleware } from "@reduxjs/toolkit"

export type Task = {
    userId: string
    taskId: string 
    taskName: string
    important: boolean
    date: number | null
}

export type TaskState = {
    userId : string | null
    userName: string | null
    Today: Task[]
    Tomorrow: Task[]
    AfterTomorrow: Task[]
    Future: Task[]    
}

export type User = {
    userId: string
    userName: string
}


const initialState : TaskState  = {
    userId: null,
    userName: null,
    Today: [],
    Tomorrow: [],
    AfterTomorrow: [],
    Future: []
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
        clearLocalStorage(state) {
            localStorage.removeItem("reduxState")
            return state
        },
        addUserName(state, action: PayloadAction<string | null>) {
            state.userName = action.payload
        },
        addUserId(state, action: PayloadAction<string | null>) {
            state.userId = action.payload
        },
        addTaskToday(state, action: PayloadAction<Task>) {
            state.Today.push(action.payload)
        },
        removeTaskToday(state, action: PayloadAction<string>) {
            state.Today = state.Today.filter( x => x.taskId !== action.payload)
        },
        addTaskTomorrow(state, action: PayloadAction<Task>) {
            state.Tomorrow.push(action.payload)
        },
        removeTaskTomorrow(state, action: PayloadAction<string>) {
            state.Tomorrow = state.Tomorrow.filter( x => x.taskId !== action.payload)
        },
        addTaskAfterTomorrow(state, action: PayloadAction<Task>) {
            state.AfterTomorrow.push(action.payload)
        },
        removeTaskAfterTomorrow(state, action: PayloadAction<string>) {
            state.AfterTomorrow = state.AfterTomorrow.filter( x => x.taskId !== action.payload)
        },
        addTaskFuture(state, action: PayloadAction<Task>) {
            state.Future.push(action.payload)
        },
        removeTaskFuture(state, action: PayloadAction<string>) {
            state.Future = state.Future.filter( x => x.taskId !== action.payload)
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
        tasks:reducer
    },
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export const actions = taskSlice.actions
export default store