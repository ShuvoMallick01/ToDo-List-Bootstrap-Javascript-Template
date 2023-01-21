const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');
const deleteBtnList = document.querySelectorAll('#delete');

let todoList = [];

// Time
function timeFormat(date) {
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return time;
}

// Date & Time
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

// Create Todo Return Function
function createTodo(title) {
  return {
    title,
    id: Date.now(),
    complete: false,
    createAt: new Date(),
  };
}

// Render UI
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
           <i id="edit" class="fa-solid fa-pen-to-square text-success edit-btn"></i>
           <i id="delete" onclick="deleteTodo(${
             item.id
           })" class="fa-solid fa-trash text-danger delete-btn"></i>
         </div>
       </div>`;
  });

  todoListWrapper.innerHTML = markup;
}

// Delete Todo
function deleteTodo(id) {
  const result = confirm('Are you want to delete this Todo?');

  if (result) {
    todoList = todoList.filter((item) => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(todoList));
    renderUI();
  } else {
  }
}

// Complete Todo
function completeTodo(id) {
  todoList = todoList.map((item) => {
    if (item.id === id) return { ...item, complete: !item.complete };
    return item;
  });

  localStorage.setItem('todos', JSON.stringify(todoList));

  renderUI();
}

// Main Function
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let inputValue = todoInput.value;

  if (!inputValue) {
    alert('Title is required!');
    return;
  }

  const newTodo = createTodo(inputValue);
  todoList.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(todoList));

  renderUI();
  todoInput.value = '';
});

// Fetch Data From localStorage
document.addEventListener('DOMContentLoaded', (e) => {
  // console.log(localStorage.getItem('todoList'));
  if (localStorage.getItem('todos')) {
    todoList = JSON.parse(localStorage.getItem('todos'));
  }

  renderUI();
});

// // Get Data from Local Storage
// function renderTodoItem(todoList) {
//   todoList.forEach((item) => {
//     const markup = `<div class="todo-item">
//           <div>
//             <h5 class="todo-title">${item.title}</h5>
//             <p class="todo-createAt text-muted">Today at ${timeFormat(
//               new Date(item.createAt)
//             )}</p>
//           </div>

//           <div class="todo-actions d-flex align-items-center">
//             <input id="complete" class="form-check-input" type="checkbox" />
//             <i
//               id="edit"
//               class="fa-solid fa-pen-to-square text-success edit-btn"
//             ></i>
//             <i
//               id="delete"
//               class="fa-solid fa-trash text-danger delete-btn"
//             ></i>
//           </div>
//       </div>`;

//     // todoListWrapper.innerHTML += markup;
//     todoListWrapper.insertAdjacentHTML('afterbegin', markup);
//   });
// }

// // To Do Add & Delete
// todoForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   if (!todoInput.value) {
//     alert('Toto title is required!');
//     return;
//   }

//   const newTodo = createTodo(todoInput.value);
//   todoList.push(newTodo);
//   localStorage.setItem('todoList', JSON.stringify(todoList));
//   // console.log(todoList);
//   todoInput.value = '';
//   focusInput();

//   const markup = `<div class="todo-item">
//         <div>
//           <h5 class="todo-title">${newTodo.title}</h5>
//           <p class="todo-createAt text-muted">Today at ${timeFormat(
//             new Date(newTodo.createAt)
//           )}</p>
//         </div>

//         <div class="todo-actions d-flex align-items-center">
//           <input id="complete" class="form-check-input" type="checkbox" />
//           <i
//             id="edit"
//             class="fa-solid fa-pen-to-square text-success edit-btn"
//           ></i>
//           <i
//             id="delete"
//             class="fa-solid fa-trash text-danger delete-btn"
//           ></i>
//         </div>
//     </div>`;

//   // todoListWrapper.innerHTML += markup;
//   todoListWrapper.insertAdjacentHTML('afterbegin', markup);

//   // Delete Todo
//   const deleteBtnList = document.querySelectorAll('#delete');

//   deleteBtnList.forEach((element) => {
//     element.addEventListener('click', (e) => {
//       const todoItem = element.closest('.todo-item');
//       todoItem.style.display = 'none';
//     });
//   });

//   // Complete Todo
//   const completeCheckList = document.querySelectorAll('#complete');

//   completeCheckList.forEach((element) => {
//     element.addEventListener('change', (e) => {
//       if (element.checked) {
//         const todoItem2 = element.closest('.todo-item');
//         todoItem2.style.color = 'gray';
//       } else if (!element.checked) {
//         const todoItem2 = element.closest('.todo-item');
//         todoItem2.style.color = 'black';
//       }
//     });
//   });

//   // Edit Todo
//   const editTodo = document.querySelectorAll('#edit');
//   // console.log(editTodo);
//   editTodo.forEach((element) => {
//     element.addEventListener('click', (e) => {
//       // createTodo().title = editTodo.innerText;
//       todoInput.value = createTodo(e.innerHTML);
//       // console.log(editTodo.innertext);
//       // console.log(e);
//     });
//   });
// });

// // Focus Cursor Into Input Field
// function focusInput() {
//   todoInput.addEventListener('focus', () => {
//     console.log('focus');
//   });
// }

// document.addEventListener('DOMContentLoaded', (e) => {
//   // console.log(localStorage.getItem('todoList'));
//   const todoList = JSON.parse(localStorage.getItem('todoList'));
//   renderTodoItem(todoList);
// });
