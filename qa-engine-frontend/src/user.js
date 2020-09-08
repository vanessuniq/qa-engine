//create user forms for sign up/login
function createUserForm(type, url) {
    const form = createForm();
    const h1 = document.createElement('h1');
    h1.innerHTML = type;
    const username = document.createElement('input');
    username.id = 'username';
    username.placeholder = 'Enter Username'
    const password = document.createElement('input');
    password.id = 'password';
    password.placeholder = 'Enter Password';

    const buttons = formButtons(type);
    form.append(h1, username, password, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        getUser(username.textContent, password.textContent, url);

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

function closeForm() {
    document.querySelector('div.form_popup').remove();
};
// registration
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