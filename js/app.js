const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');
const deleteBtnList = document.querySelectorAll('#delete');

let todoList = [];

// Current Time
function timeFormat(date) {
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return time;
}

// Current Date & Time
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

// To Do Add & Delete
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!todoInput.value) {
    alert('Toto title is required!');
    return;
  }

  const newTodo = createTodo(todoInput.value);
  todoList.push(newTodo);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  // console.log(todoList);
  todoInput.value = '';
  focusInput();

  // Create parent div
  const parentDiv = document.createElement('div');
  parentDiv.className = 'todo-item';
  // Create First title
  const firstElement = document.createElement('div');
  const titleElement = document.createElement('h5');
  titleElement.className = 'todo-title';
  titleElement.textContent = newTodo.title;
  // Create Time
  const dateElement = document.createElement('p');
  dateElement.className = 'todo-createAt text-muted';
  dateElement.textContent = `Today at ${timeFormat(
    new Date(newTodo.createAt)
  )}`;

  // // Create second Element
  // const secondElement = document.createElement('div');
  // secondElement.className = 'todo-actions d-flex align-items-center';
  // // Input Element
  // const inputElement = document.createElement('input');
  // inputElement.type = 'checkbox';
  // inputElement.className = 'form-check-input';
  // inputElement.id = 'complete';
  // // Edit icon Element
  // const editIconElement = document.createElement('i');
  // editIconElement.id = 'edit';
  // editIconElement.classList = 'fa-solid fa-pen-to-square text-success edit-btn';
  // // Delete icon Element
  // const deleteIconElement = document.createElement('i');
  // deleteIconElement.id = 'delete';
  // deleteIconElement.classList = 'fa-solid fa-trash text-danger delete-btn';

  // // append element
  // firstElement.append(titleElement, dateElement);
  // secondElement.append(inputElement, editIconElement, deleteIconElement);
  // parentDiv.append(firstElement, secondElement);

  // todoListWrapper.append(parentDiv);

  // html markup
  const markup = `<div class="todo-item">
        <div>
          <h5 class="todo-title">${newTodo.title}</h5>
          <p class="todo-createAt text-muted">Today at ${timeFormat(
            new Date(newTodo.createAt)
          )}</p>
        </div>

        <div class="todo-actions d-flex align-items-center">
          <input id="complete" class="form-check-input" type="checkbox" />
          <i
            id="edit"
            class="fa-solid fa-pen-to-square text-success edit-btn"
          ></i>
          <i
            id="delete"
            class="fa-solid fa-trash text-danger delete-btn"
          ></i>
        </div>
    </div>`;

  todoListWrapper.innerHTML += markup;
  todoListWrapper.insertAdjacentHTML('afterbegin', markup);

  // Delete Todo
  const deleteBtnList = document.querySelectorAll('#delete');

  deleteBtnList.forEach((element) => {
    element.addEventListener('click', (e) => {
      const todoItem = element.closest('.todo-item');
      todoItem.style.display = 'none';
    });
  });

  // Complete Todo
  const completeCheckList = document.querySelectorAll('#complete');

  completeCheckList.forEach((element) => {
    element.addEventListener('change', (e) => {
      if (element.checked) {
        const todoItem2 = element.closest('.todo-item');
        todoItem2.style.color = 'gray';
      } else if (!element.checked) {
        const todoItem2 = element.closest('.todo-item');
        todoItem2.style.color = 'black';
      }
    });
  });

  // Edit Todo
  const editTodo = document.querySelectorAll('#edit');
  // console.log(editTodo);
  editTodo.forEach((element) => {
    element.addEventListener('click', (e) => {
      // createTodo().title = editTodo.innerText;
      todoInput.value = createTodo(e.innerHTML);
      // console.log(editTodo.innertext);
      // console.log(e);
    });
  });
});

// Focus Cursor Into Input Field
function focusInput() {
  todoInput.addEventListener('focus', () => {
    console.log('focus');
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  console.log(localStorage.getItem('todoList'));
});
