const todoForm = document.querySelector('#todoForm');
// const todoInputBtn = document.getElementById('todoInputBtn');
const todoInput = document.querySelector('#todoInput');
const todoLists = document.querySelector('.todoLists');

// console.log(todoForm);
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

  const todoElement = document.createElement('h4');
  todoElement.classList.add('mb-0', 'pb-0', 'todoText');
  todoElement.innerText = todo;

  parentTodoElement.appendChild(todoContentElement);
  todoContentElement.appendChild(todoElement);
  todoLists.appendChild(parentTodoElement);

  // icons Element
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

  // edit Elements
  const editTodo = document.createElement('i');
  editTodo.classList.add(
    'editTodo',
    'fa-solid',
    'fa-pen-to-square',
    'text-success'
  );

  // Delete Elements
  const deleteTodo = document.createElement('i');
  deleteTodo.classList.add('deleteTodo', 'fa-solid', 'fa-trash', 'text-danger');

  todoActionIcons.appendChild(editTodo);
  todoActionIcons.appendChild(deleteTodo);
  parentTodoElement.appendChild(todoActionIcons);

  deleteTodo.addEventListener('click', () => {
    todoLists.removeChild(parentTodoElement);
  });

  todoInput.value = '';

  editTodo.addEventListener('click', () => {
    if (editTodo.classList.contains('editTodo')) {
      todoInput.value = todoElement.innerText;
      todoLists.removeChild(parentTodoElement);
      return;
    }
  });
});
