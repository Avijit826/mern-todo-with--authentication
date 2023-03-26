const Todo = require('../models/todo.model')

const getTodos = (req, res) => {
    Todo.find({
    //   user: req.params.userId // With User Auth
    })
      .sort({ updatedAt: -1 })
      .then((todo) => {
        res.json(todo)
      })
      .catch((err) =>
        res.status(404).json({ message: "no todo found", error: err.message })
      )
  }
  const createTodo = (req, res) => {
    Todo.create(req.body)
      .then((data) => {
        res.json({ message: "todo added successfully", data })
      })
      .catch((err) =>
        res.status(400).json({
          message: "unable to add new todo",
          error: err.message,
        })
      )
  }
  

  module.exports = {
    getTodos,
    createTodo,
}