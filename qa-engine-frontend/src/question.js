let allQuestions = [];
class Question {
    constructor(id, author, title, body, topic, created_at) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.body = body;
        this.topic = topic;
        this.created_at = created_at
    };
    dateFormat() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(this.created_at).toLocaleDateString('en-US', options)
    }
    // Show
    renderQuestion() {
        let question = document.createElement('div');
        question.class = 'question';
        let h1 = document.createElement('h1');
        let span = document.createElement('span');
        span.style.color = 'brown'
        span.textContent = '#' + this.topic
        h1.textContent = `${this.title} || `
        h1.appendChild(span)

        let user = document.createElement('div');
        user.class = 'user';
        let h5 = document.createElement('h5');
        h5.textContent = `Posted by: ${this.author}  || posted on: ${this.dateFormat()}`;
        user.appendChild(h5);

        let content = document.createElement('div');
        content.class = 'content';
        let p = document.createElement('p');
        p.textContent = this.body;
        content.appendChild(p);

        question.append(h1, user, content, ...this.questionAction());
        return question
    };

    questionAction() {
        const view = document.createElement('button');
        view.class = 'action';
        view.textContent = 'view'
        view.style.color = 'blue'
        const destroy = document.createElement('button');
        destroy.class = 'action';
        destroy.textContent = 'delete';
        destroy.style.color = 'red';

        return [view, destroy]
    };
    // fetch and display all questions (Index)
    static async fetchQuestions() {
        await fetch(QUESTIONS).then(resp => resp.json()).then(result => {
            result.data.forEach(element => {
                const id = element.id;
                const {author, title, body, topic, created_at} = element.attributes;
                allQuestions.push(new Question(id, author, title, body, topic, created_at))
            });
        }).catch(error => alert(error));
        this.displayAllQuestions();
    }
    static displayAllQuestions() {
        main.innerText = '';
        let sortedQuestions = allQuestions.sort(function(a,b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        sortedQuestions.forEach(question => {
            let displayQuestion = question.renderQuestion();
            main.appendChild(displayQuestion)
        });
    
    };
};
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
    const body =  document.createElement('textarea');
    body.rows = '5';
    body.cols = '30';
    body.placeholder = 'Type your Question'
    const br = document.createElement('br')
    const buttons = formButtons(type);
    form.append(author, title, br, select, body, ...buttons)

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        postQuestion(author.value, title.value, body.value, select.value, url);
    })
    
};

// Create question
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

Question.fetchQuestions();

