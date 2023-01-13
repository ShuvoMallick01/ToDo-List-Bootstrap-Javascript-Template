const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');
const deleteBtnList = document.querySelectorAll('#delete');

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
  todoInput.value = '';

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

  //   Delete Todo
  const deleteBtnList = document.querySelectorAll('#delete');

  deleteBtnList.forEach((element) => {
    element.addEventListener('click', (e) => {
      const todoItem = element.closest('.todo-item');
      todoItem.style.display = 'none';
    });
  });

  //Complete Todo
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
});
