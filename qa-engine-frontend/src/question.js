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

// questions form
function CreateQuestionForm(type, url) {
    const form = createForm();
    const author = document.createElement('input');
    author.placeholder = 'Enter your name/username'
    const title = document.createElement('input');
    title.placeholder = 'Question title';
    const select = document.querySelector('header div select');
    const content =  document.createElement('textarea');
    
    const buttons = formButtons(type);
    form.append(author, title, select, content, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        postQuestion(author.textContent, title.textContent, body.textContent, select.nodeValue, url);
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

}