let allQuestions = [];
class Questions {
    constructor(id, author, title, body, topic) {
        this._id = id;
        this._author = author;
        this._title = title;
        this._body = body;
        this._topic = topic
    }
};

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

// questions form
function CreateQuestionForm(type, url) {
    const form = createForm(type);
    const author = document.createElement('input');
    author.placeholder = 'Enter your name/username'
    const title = document.createElement('input');
    title.placeholder = 'Question title';
    const select = selection();
    const body =  document.createElement('textarea');
    body.rows = '5';
    body.cols = '30';
    body.placeholder = 'Type your Question'
    const br = document.createElement('br')
    const buttons = formButtons(type);
    form.append(author, title, select, br, body, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        postQuestion(author.value, title.value, body.value, select.value, url);
        debugger;
    })
    
};

// post question
function postQuestion(author, title, body, topic, url) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            question: {
                author,
                title,
                body,
                topic
            }
        })
    }).then(resp => resp.json()).then(data => console.log(data))

};

// fetch and display all questions
function displayQuestions(params) {
    
}