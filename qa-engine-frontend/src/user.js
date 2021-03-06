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
    let dataObj = {user: {username, password}}
    closeForm();
    fetch(url, config(dataObj)).then(resp => resp.json()).then(data => console.log(data))
};

