const express = require("express")
const auth = require("../config/auth")
const router = express.Router()

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask
} = require('../controllers/todo.controller')

router.get('/',auth, getTodos)
router.post('/', createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)

router.get("/:id/tasks", getTasks)
router.post("/:id/tasks", addTask)
router.put("/:id/tasks/:taskId", updateTask)
router.put("/:id/task/:taskId", updateTaskStatus)
router.delete("/:id/tasks/:taskId", deleteTask)

module.exports = router