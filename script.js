var todo = document.getElementById('todo');
var addTodo = document.getElementById('addTodo');
var navbarUl = document.getElementById('navbar-ul');
var typeOfTodo = document.getElementById('typeOfTodo');
var navOpenButton = document.getElementById('navOpenButton');
var todosContainer = document.getElementById('todosContainer');
var navCloseButton = document.getElementById('navCloseButton');
var todoArray = [];

var link = window.location.href.split('/')[3].split('.')[0];

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
  if (link == '') localStorage.setItem('personal', JSON.stringify(todoArray));
  else localStorage.setItem(link, JSON.stringify(todoArray));
}

function getLocalStorage() {
  if (link == '') link = 'personal';
  let temp = localStorage.getItem(link);
  let string = link;
  typeOfTodo.innerHTML = string.charAt(0).toUpperCase() + string.slice(1);

  if (temp !== null) {
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

navCloseButton.addEventListener('click', () => {
  navbarUl.style.top = '-900px';
});
navOpenButton.addEventListener('click', () => {
  navbarUl.style.top = '-240px';
});
