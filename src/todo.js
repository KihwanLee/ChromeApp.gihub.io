
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(event) {
    event.preventDefault();
    
    const btn = event.target;

    const li = btn.parentNode;

    toDoList.removeChild(li);

    console.log(li.id);

    const cleanTodos = toDos.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanTodos;

    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement('li');
    const deleteBtn =  document.createElement('button');
    deleteBtn.innerText = "Del";
    deleteBtn.addEventListener("click", deleteToDo);

    const span = document.createElement('span');
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    toDoList.appendChild(li);
    li.id = newId;

    const toDoObj = {
        text: text,
        id: newId
    }

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; 
}

function loadTodos()  {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {
        const parsedTodos = JSON.parse(loadedToDos);
        parsedTodos.forEach((toDo) => {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadTodos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();