CREATE_USER = 'http://localhost:3000/users'
LOGIN_USER = 'http://localhost:3000/login'
const header = document.querySelector('header');
const main = document.querySelector('main');

function createUserForm(type, url) {
    main.innerText = '';
    const div = document.createElement('div');
    div.classList.add('form_popup');
    main.appendChild(div);
    const form = document.createElement('form');
    form.classList.add('container');
    div.appendChild(form);
    const h1 = document.createElement('h1');
    h1.innerHTML = type;
    const username = document.createElement('input');
    username.id = 'username';
    username.placeholder = 'Enter Username'
    const password = document.createElement('input');
    password.id = 'password';
    password.placeholder = 'Enter Password';

    const submit = document.createElement('button')
    submit.type = 'submit';
    submit.style.background = 'green'
    submit.innerText = type;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        getUser(username.textContent, password.textContent, url);

    })
    const cancel = document.createElement('button');
    cancel.style.background = 'red'
    cancel.innerText = 'cancel';
    cancel.addEventListener('click', event => {
        event.preventDefault();
        closeForm();
    })

    form.append(h1, username, password, submit, cancel)
};

function getUser(username, password, url) {
    //const username = document.getElementById('username').textContent;
    //const password =document.getElementById('password').textContent;
    debugger;
    closeForm();
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(resp => resp.json()).then(data => console.log(data))
};

function closeForm() {
    document.querySelector('div.form_popup').remove();
};

function registration() {
    regEvent = document.getElementById('nav');
    regEvent.addEventListener('click', (e) => {
        const targetElement = e.target;
        if (targetElement.id === 'newq') {
            // logic to execute
        } else if(targetElement.id === 'login'){
            createUserForm(targetElement.innerText, LOGIN_USER)
        } else {
            createUserForm(targetElement.innerText, CREATE_USER)
        }
    })
};
registration();