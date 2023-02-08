let todo = document.getElementById('todo');
let addTodo = document.getElementById('addTodo');
let todosContainer = document.getElementById('todosContainer');

let todoArray = [];

addTodo.addEventListener('click', () => {
  if (todo.value == '') {
    alert('Enter a value !');
  } else {
    todoArray.push(todo.value);
    todosContainer.innerHTML = '';
    setLocalStorage();
    populateList();

    todo.value = '';
  }
});

function deleteTodo(id) {
  todoArray = todoArray.filter((todo) => todoArray.indexOf(todo) !== id);
  todosContainer.innerHTML = '';
  populateList();
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoArray));
}

function getLocalStorage() {
  let temp = localStorage.getItem('todos');
  if (temp !== null) {
    console.log(temp);
    todoArray = JSON.parse(temp);
  } else {
    todoArray = [];
  }
  populateList();
}

function populateList() {
  todoArray.forEach((todo) => {
    let newTodo = document.createElement('li');
    newTodo.innerHTML = `<input type="button" value="-" onclick="deleteTodo(${todoArray.indexOf(
      todo
    )})" />${todo}`;
    newTodo.setAttribute('id', todoArray.indexOf(todo));
    todosContainer.appendChild(newTodo);
  });
}
