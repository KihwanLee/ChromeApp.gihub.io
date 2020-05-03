const form = document.querySelector(".js-form"),
    input = form.querySelector("input"), 
    greeting = document.querySelector(".js-grettings");

input.addEventListener("input", onInputChanged);
form.addEventListener("submit", onSubmit);

const USER_LS = "currentUser";
const CLASS_CN= "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function onInputChanged(event) {
    console.log(event.target.value);
}

function onSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintgreeting(currentValue);
}

function askForName() {
    greeting.classList.remove(CLASS_CN);
    form.classList.add(CLASS_CN);
    input.value = "";
}

function paintgreeting(text) {
    form.classList.remove(CLASS_CN);
    greeting.classList.add(CLASS_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {
        askForName();
    }
    else {
        paintgreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();