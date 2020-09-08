CREATE_USER = 'http://localhost:3000/users'
LOGIN_USER = 'http://localhost:3000/login'
const header = document.querySelector('header');
const main = document.querySelector('main');

// form element
function createForm() {
    const div = document.createElement('div');
    div.classList.add('form_popup');
    header.appendChild(div);
    const form = document.createElement('form');
    form.classList.add('container');
    div.appendChild(form);
    return form
};

function formButtons(type, type1 = 'cancel') {
    const submit = document.createElement('button')
    submit.type = 'submit';
    submit.style.background = 'green'
    submit.innerText = type;

    const cancel = document.createElement('button');
    cancel.style.background = 'red'
    cancel.innerText = type1;
    cancel.addEventListener('click', event => {
        event.preventDefault();
        closeForm();
    });

    return [submit, cancel]
}