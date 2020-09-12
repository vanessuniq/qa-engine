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

        question.append(h1, user, content, ...this.questionAction());
        return question
    };

    questionAction() {
        const view = document.createElement('button');
        view.className = 'action';
        view.textContent = 'view'
        view.style.color = 'blue'
        const destroy = document.createElement('button');
        destroy.className = 'action';
        destroy.textContent = 'delete';
        destroy.style.color = 'red';

        return [view, destroy]
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