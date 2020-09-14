// helper question functions

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
    return select;
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
    body.cols = '42';
    body.placeholder = 'Type your Question'
    const br = document.createElement('br')
    const buttons = formButtons(type);
    const errorContainer = invalid.cloneNode()
    form.append(errorContainer, author, title, br, select, body, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        Question.postQuestion(author.value, title.value, body.value, select.value, url, errorContainer);
    })

};