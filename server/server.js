const express = require("express")
const cors = require("cors")
const { todoData } = require("./utils/todos")

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function getListItems(todos) {
  return todos
    .sort((a, b) => a.id - b.id)
    .map((todo) => {
      return /* html */ `<li><input 
          type="checkbox" ${todo.completed ? "checked" : ""}
          id="todo_${todo.id}"
          hx-put="http://localhost:3000/todo/${todo.id}" 
          hx-trigger="click"
          hx-target="#todo-list"/><label for="todo_${todo.id}">${
        todo.title
      }</label> <button hx-delete="http://localhost:3000/todo/${
        todo.id
      }"hx-trigger="click" hx-target="#todo-list">❌</button></li>`
    })
    .join("")
}

app.get("/todo", (req, res) => {
  const listItems = getListItems(todoData.todos)
  console.log("Triggered")

  return res.send(listItems)
})

app.post("/todo", async (req, res) => {
  const { newTodo } = req.body
  todoData.createTodo(newTodo)

  const listItems = getListItems(todoData.todos)

  return res.send(listItems)
})

app.put("/todo/:id", async (req, res) => {
  const todoId = req.params.id
  todoData.updateTodo(Number(todoId))

  const listItems = getListItems(todoData.todos)

  return res.send(listItems)
})

app.delete("/todo/:id", async (req, res) => {
  todoData.deleteTodo(+req.params.id)
  const listItems = getListItems(todoData.todos)
  return res.send(listItems)
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
