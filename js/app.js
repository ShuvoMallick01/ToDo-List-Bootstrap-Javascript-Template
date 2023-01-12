const currentDay = document.getElementById('date');
const currentTime = document.getElementById('time');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
const todoListWrapper = document.querySelector('.todo-list');

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

// Create Todo Function
function createTodo(title) {
  return {
    title,
    id: Date.now(),
    complete: false,
    createAt: new Date(),
  };
}

currentDateTime();

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //   console.log(e);
  //   console.log(todoInput.value);
  if (!todoInput.value) {
    alert('Toto title is required!');
    return;
  }

  //   to do Value Store
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
          <input class="form-check-input" type="checkbox" />
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

  const deleteBtnList = document.querySelectorAll('#delete');
  //   console.log(deleteBtnList);

  deleteBtnList.forEach((element) => {
    element.addEventListener('click', (e) => {
      const todoItem = element.closest('.todo-item');
      //   todoItem.style.display = 'none';
      console.log(todoItem.style);
    });
  });
});
