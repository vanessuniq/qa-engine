let allQuestions = [];
// select element for questions form
function selection() {
    const select = document.createElement('select');
    const topic = ['Select Topic', 'Rails', 'HTML', 'CSS', 'JS'];
    topic.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        select.appendChild(option)
    });
    return select
}

// questions form (New)
function CreateQuestionForm(type, url) {
    const form = createForm(type);
    const author = document.createElement('input');
    author.placeholder = 'Enter your name/username'
    const title = document.createElement('input');
    title.placeholder = 'Question title';
    const select = selection();
    const body = document.createElement('textarea');
    body.rows = '5';
    body.cols = '30';
    body.placeholder = 'Type your Question'
    const br = document.createElement('br')
    const buttons = formButtons(type);
    form.append(invalid, author, title, br, select, body, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        postQuestion(author.value, title.value, body.value, select.value, url);
    })

};

// Create question
function postQuestion(author, title, body, topic, url) {
    let dataObj = { question: { author, title, body, topic } }
    fetch(url, config(dataObj)).then(resp => resp.json()).then(result => {
        if (result.data) {
            newQuestion(result.data);
            closeForm();
        } else {
            formErrors(result.errors)
        }
    }).catch(error => alert(error));
};

// handle data from fetch
function newQuestion(fetchResult) {
    const id = fetchResult.id;
    const { author, title, body, topic, created_at } = fetchResult.attributes;
    allQuestions.push(new Question(id, author, title, body, topic, created_at));

    Question.displayAllQuestions();
}