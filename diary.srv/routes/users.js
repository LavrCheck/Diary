var express = require('express');
var router = express.Router();

const { Task, User, addUser, addLogsRegistration, addTask, addLogsTasks, getTasks, letIn, deleteTask } = require('../db')

/* GET users listing. */

router.post('/auth/sign-up', async function (req, res) {
  const body = req.body

  try {
    const usr = new User(body.userName, body.password);
    const result = await addUser(usr)
    res.status(201)
    res.json(result)
    res.end()

  } catch (err) {
    if (err.code === '23505') {
      res.status(409)
      res.end()
    } else {
      await addLogsRegistration(new User(body.userName, body.password))
      res.status(500)
      res.end()
    }
  }
})

router.post('/auth/sign-in', async function (req, res) {
  const body = req.body

  try {
    const result = await letIn(new User(body.userName, body.password))
    res.status(200)
    res.json(result)
    res.end()

  } catch (err) {
    if (err.message === 'User not found') {
      res.status(404)
      res.end()
    } else {
    res.status(500)
    res.end()
    }
  }
})

router.post('/', async function (req, res) {
  const body = req.body

  try {
    await addTask(new Task(body.userId, body.taskName, body.important, body.date))
    res.status(201)
    res.end()

  } catch (err) {
    await addLogsTasks(new Task(body.userId, body.taskName, body.important, body.date))
    res.status(500)
    res.end()
  }
})

router.delete('/:taskId', async function (req,res) {
  const taskId = req.params.taskId

  await deleteTask(taskId)
  res.status(200)
  res.end()
})

router.get('/:userId', async function (req, res) {
  const userId = req.params.userId

  try {
    const result = await getTasks(userId)
    res.status(200)
    res.json(result)
    res.end()

  } catch (err) {
    res.status(500)
    res.end()
  }
})

module.exports = router;
