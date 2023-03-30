const Todo = require('../models/todo.model')

const getTodos = (req, res) => {
    Todo.find({
    //   user: req.params.userId // With User Auth
    })
      .sort({ updatedAt: -1 })
      .then((todo) => {
        res.json(todo)
        console.log(req.user.id)
      })
      .catch((err) =>
        res.status(404).json({ message: "no todo found", error: err.message })
      )
  }
  const createTodo = (req, res) => {
    req.body.user = req.user.id
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
  const getTodoById = (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        res.json(todo)
      })
      .catch((err) =>
        res.status(404).json({ message: "no todo found", error: err.message })
      )
  }
  const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => {
        res.json({ message: "updated successfully", data })
      })
      .catch((err) =>
        res
          .status(400)
          .json({ error: "unable to update todo", message: err.message })
      )
  }
  const deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body)
      .then((data) =>
        data
          ? res.json({ message: "todo deleted successfully", data })
          : res
              .status(404)
              .json({ message: "Todo Not Found", error: "No todo on such id" })
      )
      .catch((err) =>
        res.status(400).json({ error: "Bad Request", message: err.message })
      )
  }
  
  // -----------------Tasks Controllers -----------------
  const getTasks = (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        res.json(todo.tasks)
      })
      .catch((err) =>
        res.status(404).json({ message: "no todo found", error: err.message })
      )
  }
  const addTask = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id)
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      todo.tasks.push(req.body)
      const saveTodo = await todo.save()
      res.json(saveTodo)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  const updateTask = async (req, res) => {
    try {
      const { id, taskId } = req.params;
      const { task } = req.body;
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      const taskIndex = todo.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      todo.tasks[taskIndex].task = task;
      const saveTodo = await todo.save();
      res.json(saveTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  const updateTaskStatus = async (req, res) => {
    try {
      const { id, taskId } = req.params;
      const { iscompleted } = req.body;
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      const taskIndex = todo.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      todo.tasks[taskIndex].iscompleted = iscompleted;
      const savedTodo = await todo.save();
      res.json(savedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  const deleteTask = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id)
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      const taskIndex = todo.tasks.findIndex((t) => t.id === req.params.taskId)
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      todo.tasks.splice(taskIndex, 1)
      const saveTodo = await todo.save()
      res.json(saveTodo)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
  module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
    getTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask
}