let todo = document.getElementById('todo');
let addTodo = document.getElementById('addTodo');
let navbarUl = document.getElementById('navbar-ul');
let navOpenButton = document.getElementById('navOpenButton');
let todosContainer = document.getElementById('todosContainer');
let navCloseButton = document.getElementById('navCloseButton');
let min = document.getElementById('number_minutes')
let sec = document.getElementById('number_seconds')
// let hr = document.getElementById('number_hours')
let todoArray = [];

addTodo.addEventListener('click', () => {
  if (todo.value == '') {
    alert('Enter a value !');
  } else {
    console.log(todoArray)
    todoArray.push([todo.value, min.value, sec.value]);
    todosContainer.innerHTML = '';
    min.value = 0
    sec.value = 0
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
    )})" />${todo[0]} <span id="time${todoArray.indexOf(todo)}"></span>`;
    newTodo.setAttribute('id', todoArray.indexOf(todo));
    todosContainer.appendChild(newTodo);
  });
  triggerTimer()
}

function triggerTimer(){
  todoArray.forEach((todo) => {
    var minutes = parseInt(todo[1]*60) + parseInt(todo[2])
    display = document.querySelector(`#time${todoArray.indexOf(todo)}`);
    startTimer(minutes, display);
  });
}

navCloseButton.addEventListener('click', () => {
  navbarUl.style.top = '-900px';
});
navOpenButton.addEventListener('click', () => {
  navbarUl.style.top = '-240px';
});

// adding a timer function

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// to constraint the timer with numerical values
function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}