//Select all elevents
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  // all eventlisteners
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
    //clear todos from UI

    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".list-group-item");

  listItem.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();

    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo başarıyla silindi..");
  }
}
function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1); // delete value from array
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin..");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi..");
  }

  e.preventDefault();
}
function getTodosFromStorage() {
  // catch all todos from storage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;

  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  //create listItem
  const listItem = document.createElement("li");
  //create link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  //text node add
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //listItem add to TodoList
  todoList.appendChild(listItem);
}
