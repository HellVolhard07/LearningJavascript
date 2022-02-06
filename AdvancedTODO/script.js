const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEYS = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(renderTodo)

list.addEventListener("change", (event) => {
  if (!event.target.matches("[data-list-item-checkbox]")) return

  const parent = event.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find((todoItem) => {
    return todoItem.id === todoId
  })
  todo.complete = event.target.checked
  saveTodos()
})

list.addEventListener("click", (event) => {
  if (!event.target.matches("[data-button-delete]")) return

  const parent = event.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find((todoItem) => {
    return todoItem.id === todoId
  })
  parent.remove()
  todos = todos.filter((todoItem) => {
    return todoItem.id !== todoId
  })
  saveTodos()
})

list.addEventListener("click", (event) => {
  if (!event.target.matches("[data-button-edit]")) return

  const parent = event.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find((todoItem) => {
    return todoItem.id === todoId
  })
  const todoName = todoInput.value
  if (todoName === "") return
  const newTodo = parent.querySelector("[data-list-item-text]")
  newTodo.innerText = todoName
  todo.name = todoName
  saveTodos()
  todoInput.value = ""
})

// Add todo
form.addEventListener("submit", (event) => {
  event.preventDefault()

  const todoName = todoInput.value

  if (todoName === "") return

  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  }

  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.complete
  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEYS, JSON.stringify(todos))
}

function loadTodos() {
  const todoString = localStorage.getItem(TODOS_STORAGE_KEYS)
  return JSON.parse(todoString) || []
}
