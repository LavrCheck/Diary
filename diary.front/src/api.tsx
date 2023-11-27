import axios from "axios"

class User {
    userName
    password

    constructor(userName: string, password: string) {
        this.userName = userName
        this.password = password
    }
}

function parseGV(gl: string) {
    const [userPassword, hostPort] = gl.split('@')
    const [globalHost, globalPort] = hostPort.split(':')
    return {
        globalHost,
        globalPort
    }
}
const globalVariable = process.env.REACT_APP_API_HOST
let globalHost: string = ''
let globalPort: string = ''

if (globalVariable) { // TS things
    const parsedValues = parseGV(globalVariable)
    globalHost = parsedValues.globalHost
    globalPort = parsedValues.globalPort
}


export async function signUp(userName: string, password: string) {
    const result = await axios.post(`http://${globalHost}:${globalPort}/users/auth/sign-up`, new User(userName, password))
    return result.data
}

export async function signIn(userName: string, password: string) {
    const result = await axios.post(`http://${globalHost}:${globalPort}/users/auth/sign-in`, new User(userName, password))
    return result.data
}

export async function getTasks(userId: string) {
    const result = await axios.get(`http://${globalHost}:${globalPort}/users/${userId}`)
    return result.data
}

export async function removeTaskBD(taskId: string) {
    await axios.delete(`http://${globalHost}:${globalPort}/users/${taskId}`)
}

export async function addTaskBD(task: any) {
    await axios.post(`http://${globalHost}:${globalPort}/users`, task)
}