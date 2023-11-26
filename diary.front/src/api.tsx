import axios from "axios"

class User {
    userName
    password

    constructor(userName: string, password: string) {
        this.userName = userName
        this.password = password
    }
}

export async function signUp(userName: string, password: string) {
    const result = await axios.post('http://localhost:3000/users/auth/sign-up', new User(userName, password))
    return result.data
}

export async function signIn(userName: string, password: string) {
        const result = await axios.post('http://localhost:3000/users/auth/sign-in', new User(userName, password))
        return result.data
}

export async function getTasks(userId: string) {
    const result = await axios.get(`http://localhost:3000/users/${userId}`)
    return result.data
}

export async function removeTaskBD(taskId: string) {
    await axios.delete(`http://localhost:3000/users/${taskId}`)
}

export async function addTaskBD(task: any) {
    await axios.post('http://localhost:3000/users',task)
}