    const { Client } = require('pg')

    const client = new Client ({ user: 'postgres', password: 'postgrespw', host: 'localhost', port: 49153})

    class Task {
        userId
        taskName
        important
        date

        constructor(userId, taskName, important, date) {
            this.userId = userId
            this.taskName = taskName
            this.important = important
            this.date = date
        }
    }

    class User {
        userName
        password

        constructor(userName, password) {
            this.userName = userName
            this.password = password
        }
    }

    async function connect() {
        await client.connect()
    }

    async function initTables() {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await client.query('CREATE TABLE IF NOT EXISTS users (userId UUID DEFAULT uuid_generate_v1() PRIMARY KEY, userName TEXT NOT NULL UNIQUE, password TEXT NOT NULL)')
        await client.query('CREATE TABLE IF NOT EXISTS tasks (userId UUID REFERENCES users (userId), taskId UUID DEFAULT uuid_generate_v1() PRIMARY KEY, taskName TEXT NOT NULL, important BOOLEAN, date BIGINT)')
        await client.query('CREATE TABLE IF NOT EXISTS logs_registration (logId SERIAL PRIMARY KEY, userName TEXT, password TEXT)')
        await client.query('CREATE TABLE IF NOT EXISTS logs_tasks (logId SERIAL PRIMARY KEY, userId UUID REFERENCES users (userId), taskName TEXT NOT NULL, important BOOLEAN, date BIGINT NULL)')
    }

    async function addUser(user) {
        const result = await client.query('INSERT INTO users (userName, password) VALUES ($1, $2) RETURNING userId, userName ', [user.userName, user.password])
        return result.rows[0]
    }

    async function letIn(user) {
        const result = await client.query('SELECT userId, userName FROM users WHERE userName = $1 AND password = $2', [user.userName, user.password])

        if (result.rows.length === 0) {
            throw new Error('User not found')
        } else {

        return result.rows[0]
     }
    }

    async function addTask(task) {
        await client.query('INSERT INTO tasks (userId,taskName, important, date) VALUES ($1, $2, $3, $4)', [task.userId, task.taskName, task.important, task.date || null])
    }

    async function deleteTask(id) {
        await client.query('DELETE FROM tasks WHERE taskId = $1', [id])
    }

    async function addLogsRegistration(log) {
        await client.query('INSERT INTO logs_registration (userName, password) VALUES ($1, $2)', [log.userName, log.password])
    }

    async function addLogsTasks(task) {
        await client.query('INSERT INTO logs_tasks (userId, taskId taskName, important, date) VALUES ($1, $2, $3, $4, $5)', [task.userId, task.taskId, task.taskName, task.important, task.date || null])
    }

    async function getTasks(userId) {
        const result = await client.query('SELECT userId, taskId, taskName, important, date FROM tasks WHERE userId = $1', [userId])
        return result.rows
    }

    module.exports = {connect, initTables, Task, User, addUser, addLogsRegistration, addTask, addLogsTasks, getTasks, letIn, deleteTask}