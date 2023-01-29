const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');
// const deleteBtnList = document.querySelectorAll('#delete');

const allTodoLength = document.querySelector('.all-todo-length');
const openTodoLength = document.querySelector('.open-todo-length');
const completeTodoLength = document.querySelector('.complete-todo-length');

const allBtn = document.getElementById('all');
const openBtn = document.getElementById('open');
const completeBtn = document.getElementById('complete');

const searchInput = document.getElementById('search');

let todoList = [];
let editId = null;

// TIME FUNCTION
function timeFormat(date) {
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return time;
}

// DATE & TIME FUNCTION
function currentDateTime() {
  const today = new Date();

  const date = today.toLocaleDateString('en-US', {
    day: '2-digit',
    weekday: 'short',
  });

  currentDay.textContent = date;
  currentTime.textContent = timeFormat(today);
}

currentDateTime();

// CREATE TODO PRIMARY FUNCTION
function createTodo(title) {
  return {
    title,
    id: Date.now(),
    complete: false,
    createAt: new Date(),
  };
}

// RENDER UI
function renderUI(todos) {
  let markup = '';
  todos.forEach((item) => {
    markup += `<div class="todo-item">
         <div class=${item.complete ? 'text-decoration-line-through' : ''}>
           <h5 class="todo-title">${item.title}</h5>
           <p class="todo-createAt text-muted">Today at ${timeFormat(
             new Date(item.createAt)
           )}</p>
         </div>

         <div class="todo-actions d-flex align-items-center">
           <input id="complete" onchange="completeTodo(${item.id})" ${
      item.complete && 'checked'
    } class="form-check-input" type="checkbox"/>
           <i id="edit" onclick="editTodo(${
             item.id
           })" class="fa-solid fa-pen-to-square text-success edit-btn"></i>
           <i id="delete" onclick="deleteTodo(${
             item.id
           })" class="fa-solid fa-trash text-danger delete-btn"></i>
         </div>
       </div>`;
  });

  todoListWrapper.innerHTML = markup;
}

// DELETE TODO
function deleteTodo(id) {
  const result = confirm('Are you want to delete this Todo?');

  if (result) {
    todoList = todoList.filter((item) => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(todoList));
    showLength();
    renderUI(todoList);
  }
}

// COMPLETE TODO
function completeTodo(id) {
  todoList = todoList.map((item) => {
    if (item.id === id) return { ...item, complete: !item.complete };
    return item;
  });

  localStorage.setItem('todos', JSON.stringify(todoList));

  showLength();
  renderUI(todoList);
}

// EDIT TODO
function editTodo(id) {
  editId = id;
  const findTodo = todoList.find((item) => item.id === id);
  todoInput.value = findTodo.title;
}

// SHOW LENGTH TODO
function showLength() {
  allTodoLength.textContent = todoList.length;

  const openTodos = todoList.filter((item) => item.complete === false);
  openTodoLength.textContent = openTodos.length;

  const completeTodos = todoList.filter((item) => item.complete === true);
  completeTodoLength.textContent = completeTodos.length;
}

// FILTER ALL TODO
allBtn.addEventListener('click', (e) => {
  renderUI(todoList);
});

// FILTER OPEN TODO
openBtn.addEventListener('click', (e) => {
  let openTodos = todoList.filter((item) => item.complete === false);
  renderUI(openTodos);
});

// FILTER COMPLETE TODO
completeBtn.addEventListener('click', (e) => {
  let completeTodos = todoList.filter((item) => item.complete === true);
  renderUI(completeTodos);
});

// SEARCH TODO
searchInput.addEventListener('keyup', (e) => {
  const searchValue = e.target.value.toLowerCase();
  let filteredList = todoList.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  renderUI(filteredList);
});

// ADD LIST FUNCTION
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let inputValue = todoInput.value;
  // check
  if (!inputValue) {
    alert('Title is required!');
    return;
  }

  // edit
  if (editId) {
    todoList = todoList.map((item) => {
      if (item.id === editId) return { ...item, title: inputValue };
      return item;
    });
  } else {
    const newTodo = createTodo(inputValue);
    todoList.push(newTodo);
  }

  localStorage.setItem('todos', JSON.stringify(todoList));
  showLength();
  renderUI(todoList);

  todoInput.value = '';
});

// BROWSER LOAD TIME LISTENER
document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('todos')) {
    todoList = JSON.parse(localStorage.getItem('todos'));
  }

  showLength();
  // console.log(showLength());
  renderUI(todoList);
});
