import axios from "axios"

class User {
    userName
    password

    constructor(userName: string, password: string) {
        this.userName = userName
        this.password = password
    }
}


const globalHost = `https://valit.dev//lavrcheck/diary/api`


export async function signUp(userName: string, password: string) {
    const result = await axios.post(`${globalHost}/users/auth/sign-up`, new User(userName, password))
    return result.data
}

export async function signIn(userName: string, password: string) {
    const result = await axios.post(`${globalHost}/users/auth/sign-in`, new User(userName, password))
    return result.data
}

export async function getTasks(userId: string) {
    const result = await axios.get(`${globalHost}/users/${userId}`)
    return result.data
}

export async function removeTaskBD(taskId: string) {
    await axios.delete(`${globalHost}/users/${taskId}`)
}

export async function addTaskBD(task: any) {
    await axios.post(`${globalHost}/users`, task)
}