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

  const parentTodoElement = document.createElement('div');
  parentTodoElement.classList.add(
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

  parentTodoElement.appendChild(todoContentElement);
  todoContentElement.appendChild(todoHeadingElement);
  todoLists.appendChild(parentTodoElement);

  const todoActionIcons = document.createElement('div');
  todoActionIcons.classList.add(
    'actionIcons',
    'col-md-4',
    'd-flex',
    'gap-4',
    'fs-5',
    'mb-0',
    'pb-0',
    'justify-content-end'
  );

  const editTodo = document.createElement('i');
  editTodo.classList.add(
    'editTodo',
    'fa-solid',
    'fa-pen-to-square',
    'text-success'
  );

  const deleteTodo = document.createElement('i');
  deleteTodo.classList.add('deleteTodo', 'fa-solid', 'fa-trash', 'text-danger');

  todoActionIcons.appendChild(editTodo);
  todoActionIcons.appendChild(deleteTodo);
  parentTodoElement.appendChild(todoActionIcons);
});
