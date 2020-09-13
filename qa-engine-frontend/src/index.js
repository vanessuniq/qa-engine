CREATE_USER = 'http://localhost:3000/users';
LOGIN_USER = 'http://localhost:3000/login';
QUESTIONS = 'http://localhost:3000/questions';
ANSWERS = 'http://localhost:3000/answers';
const header = document.querySelector('header');
const main = document.querySelector('main');
const invalid = document.getElementById('error');

// form element
function createForm(type) {
    let popup = document.querySelector('div.form_popup');
    popup ? popup.remove() : popup
    const div = document.createElement('div');
    div.classList.add('form_popup');
    header.appendChild(div);
    const form = document.createElement('form');
    form.classList.add('container');
    div.appendChild(form);
    const h1 = document.createElement('h1');
    h1.innerHTML = type;
    form.appendChild(h1);
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
};

function closeForm() {
    document.querySelector('div.form_popup').remove();
};
// object for post request
function config(method, dataObj) {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dataObj)
    }
};

// form errors
function formErrors(errors) {
    invalid.innerText = '';
    errors.forEach(error => {
        const li = document.createElement('li');
        li.innerHTML = error;
        li.style.color = 'brown'
        invalid.appendChild(li);
    });
}

// Header event: loggin, sign up, post question
function headerEvent() {
    let Event = document.getElementById('nav');
    Event.addEventListener('click', (e) => {
        const targetElement = e.target;
        if (targetElement.id === 'newq') {
            CreateQuestionForm(targetElement.innerText, QUESTIONS);
        } else if (targetElement.id === 'login') {
            createUserForm(targetElement.innerText, LOGIN_USER);
        } else if (targetElement.id === 'signup') {
            createUserForm(targetElement.innerText, CREATE_USER);
        } else {
            Question.displayAllQuestions();
        }
    })
};
headerEvent();