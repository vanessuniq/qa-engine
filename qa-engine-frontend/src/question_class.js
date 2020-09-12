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
        question.className = 'question'
        let h1 = document.createElement('h1');
        let span = document.createElement('span');
        span.style.color = 'brown'
        span.textContent = '#' + this.topic
        h1.textContent = `${this.title} || `
        h1.appendChild(span)

        let user = document.createElement('div');
        user.className = 'user';
        let h5 = document.createElement('h5');
        h5.textContent = `Posted by: ${this.author}  || posted on: ${this.dateFormat()}`;
        user.appendChild(h5);

        let content = document.createElement('div');
        content.className = 'content';
        let p = document.createElement('p');
        p.textContent = this.body;
        content.appendChild(p);

        question.append(h1, user, content, this.questionAction());
        return question
    };

    questionAction() {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = 'actions';
        ['view', 'delete'].forEach(string => {
            const element = document.createElement('button');
            element.className = 'action';
            element.textContent = string;
            if (string === 'view') {
                element.style.color = 'blue';
            } else {
                element.style.color = 'red';
            };
            div.appendChild(element);
        });
        div.addEventListener('click', Question.questionEvent);
        return div;
    };
    static questionEvent(event) {
        const action = event.target;
        const id = action.parentNode.id;
        if (action.innerText === 'view') {
            main.innerText = '';
            const displayQuestion = allQuestions.find(obj => obj.id === id).renderQuestion();
            displayQuestion.removeChild(displayQuestion.lastElementChild);
            displayQuestion.className = 'show';
            main.appendChild(displayQuestion)
        } else {
            // add code for deleting question
        }
    };
    // fetch and display all questions (Index)
    static async fetchQuestions() {
        await fetch(QUESTIONS).then(resp => resp.json()).then(result => {
            result.data.forEach(newQuestion);
        }).catch(error => alert(error));
        this.displayAllQuestions();
    }
    static displayAllQuestions() {
        main.innerText = '';
        let sortedQuestions = allQuestions.sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        sortedQuestions.forEach(question => {
            let displayQuestion = question.renderQuestion();
            main.appendChild(displayQuestion)
        });

    };
};

Question.fetchQuestions();