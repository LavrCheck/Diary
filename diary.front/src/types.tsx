export type Task = {
    userId: string | null
    taskId: string
    taskName: string
    important: boolean
    date: number | null
}

export type TaskState = {
    userId: string | null
    userName: string | null
    tasks: Task[]
}

export type User = {
    userId: string
    userName: string
}
