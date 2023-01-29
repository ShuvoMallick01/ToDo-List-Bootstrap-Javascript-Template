const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');
// const deleteBtnList = document.querySelectorAll('#delete');

const allTodoLength = document.querySelector('.all-todo-length');
const openTodoLength = document.querySelector('.open-todo-length');
const completeTodoLength = document.querySelector('.complate-todo-length');

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
function renderUI() {
  let markup = '';
  todoList.forEach((item) => {
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
    renderUI();
  } else {
  }
}

// COMPLETE TODO
function completeTodo(id) {
  todoList = todoList.map((item) => {
    if (item.id === id) return { ...item, complete: !item.complete };
    return item;
  });

  localStorage.setItem('todos', JSON.stringify(todoList));

  renderUI();
}

// EDIT TODO
function editTodo(id) {
  editId = id;
  const findTodo = todoList.find((item) => item.id === id);
  todoInput.value = findTodo.title;
}

// SHOW TODO LENGTH
function showLength() {
  allTodoLength.textContent = todoList.length;
  // console.log(todoList.length);
  // console.log(allTodoLength.textContent);

  allTodoLength.textContent = todoList.filter(
    (item) => item.complete === false
  ).length;
  allTodoLength.textContent = todoList.filter(
    (item) => item.complete === true
  ).length;

  // console.log(allTodoLength.textContent);
}

// ADD TODO LIST
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

  renderUI();
  todoInput.value = '';
});

// BROWSER LOAD TIME LISTENER
document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('todos')) {
    todoList = JSON.parse(localStorage.getItem('todos'));
  }

  showLength();
  console.log(showLength());
  renderUI();
});
