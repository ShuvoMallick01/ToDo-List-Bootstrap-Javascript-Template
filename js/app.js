const todoForm = document.querySelector('#todoForm');
// const todoInputBtn = document.getElementById('todoInputBtn');
const todoInput = document.querySelector('#todoInput');
const todoLists = document.querySelector('.todoLists');

// console.log(todoForm);
// console.log(todoInput);
// console.log(todo);
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log('Submit Form');
  const todo = todoInput.value;
  // console.log(todo);
  if (!todo) {
    alert('Please fill the todo');
    return;
  }

  const todoElement = document.createElement('div');
  todoElement.classList.add(
    'todo',
    'mt-4',
    'd-flex',
    'align-items-center',
    'justify-content-between'
  );

  const todoContentElement = document.createElement('div');
  todoContentElement.classList.add('content', 'col-md-8');

  const todoHeadingElement = document.createElement('h4');
  todoHeadingElement.classList.add('mb-0', 'pb-0', 'todoText');
  todoHeadingElement.innerText = todo;

  todoContentElement.appendChild(todoHeadingElement);
  todoElement.appendChild(todoContentElement);
  todoLists.appendChild(todoElement);
});
