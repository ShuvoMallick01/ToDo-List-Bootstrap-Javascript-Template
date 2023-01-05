/**
const todoForm = document.getElementById('todoForm');
const todoInputBtn = document.getElementById('todoInputBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('.list-todo');

// state variable
const data = [];
// console.log(todoInputBtn);
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (todoInput.value !== '') {
    const parrentDiv = document.createElement('div');
    parrentDiv.classList.add('mt-4', 'd-flex', 'align-items-center');

    parrentDiv.textContent = todoInput.value;
    todoList.appendChild(parrentDiv);
    todoInput.value = '';
  }
});
 */
