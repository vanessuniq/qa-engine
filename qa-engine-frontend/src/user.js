//create user forms for sign up/login
function createUserForm(type, url) {
    const form = createForm(type);
    const username = document.createElement('input');
    username.id = 'username';
    username.placeholder = 'Enter Username'
    const password = document.createElement('input');
    password.id = 'password';
    password.placeholder = 'Enter Password';

    const buttons = formButtons(type);
    form.append(username, password, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        getUser(username.value, password.value, url);
    })
};
// create or get user
function getUser(username, password, url) {
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

// Header event: loggin, sign up, post question
function headerEvent() {
    let Event = document.getElementById('nav');
    Event.addEventListener('click', (e) => {
        const targetElement = e.target;
        if (targetElement.id === 'newq') {
            CreateQuestionForm(targetElement.innerText, QUESTIONS)
        } else if(targetElement.id === 'login'){
            createUserForm(targetElement.innerText, LOGIN_USER)
        } else {
            createUserForm(targetElement.innerText, CREATE_USER)
        }
    })
};
headerEvent();