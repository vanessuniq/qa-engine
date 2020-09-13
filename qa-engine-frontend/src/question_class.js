class Question extends Post {
    constructor(id, author, title, body, topic, created_at) {
        super(id, author, body, created_at);
        this.title = title;
        this.topic = topic;
    };
    //comments
    get comments() {
        return allAnswers.filter(comment => comment.question_id == this.id);
    };
    // render question oon page
    renderQuestion() {
        const question = this.renderPost();
        const h1 = document.createElement('h1');
        const span = document.createElement('span');
        span.style.color = 'brown';
        span.textContent = '#' + this.topic
        h1.textContent = `${this.title} || `
        h1.appendChild(span);
        const comment = document.createElement('p');
        comment.style.color = 'brown';
        comment.textContent = `${this.comments.length} Answers`
        question.prepend(h1, comment);

        const divButton = this.postAction('view');
        this.questionEvent(divButton);
        question.appendChild(divButton);

        return question;
    };
    // question action event handling
    questionEvent(element) {
        element.addEventListener('click', event => {
            const action = event.target;
            const id = action.parentNode.id;
            if (action.innerText === 'view') {
                Question.displayQuestion(id);
            } else {
                // add code for deleting question
            };
        });
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
    static displayQuestion(questionId) {
        main.innerText = '';
        const questionSelected = allQuestions.find(obj => obj.id === questionId);
        const displayQuestion = questionSelected.renderQuestion();
        displayQuestion.removeChild(displayQuestion.lastElementChild);
        displayQuestion.className = 'show';
        const div = document.createElement('div');
        div.textContent = 'Answer(s):';
        div.className = 'answer';
        main.append(displayQuestion, div);
        if (questionSelected.comments.length > 0) {
            questionSelected.comments.forEach(comment => {
                main.appendChild(comment.renderAnswer());
            });
        }

    }
};

Question.fetchQuestions();