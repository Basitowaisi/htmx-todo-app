exports.todoData = {
  todos: [
    {
      id: 1,
      title: "Go to market",
      completed: false,
    },
    {
      id: 2,
      title: "Pick up groceries.",
      completed: true,
    },
    {
      id: 3,
      title: "Clean the room.",
      completed: false,
    },
  ],
  getNextId: function () {
    return this.todos.sort((a, b) => b.id - a.id)[0].id + 1
  },
  createTodo: function (newTodo) {
    this.todos = [
      ...this.todos,
      {
        id: this.getNextId(),
        title: newTodo,
        completed: false,
      },
    ]

    return this.todos
  },
  updateTodo: function (todoId) {
    const otherTodos = this.todos.filter((todo) => todo.id !== todoId)
    const todo = this.todos.filter((todo) => todo.id === todoId)[0]

    this.todos = [
      ...otherTodos,
      {
        ...todo,
        completed: !todo.completed,
      },
    ]

    return this.todos
  },
  deleteTodo: function (todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId)

    return this.todos
  },
}
