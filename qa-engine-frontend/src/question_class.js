let allQuestions = [];
//Question.all = [];
class Question extends Post {
    constructor(id, author, title, body, topic, created_at) {
        super(id, author, body, created_at);
        this.title = title;
        this.topic = topic;
    };
    // property to hold the list of questions
    static all = [];
    //comments
    get comments() {
        const comments = allAnswers.filter(comment => comment.question_id == this.id);
        return comments.sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
    };
    // Create question
    static postQuestion(author, title, body, topic, url, errorContainer) {
        let dataObj = { question: { author, title, body, topic } }
        fetch(url, config('POST', dataObj)).then(resp => resp.json()).then(result => {
            if (result.data) {
                this.newQuestion(result.data);
                closeForm();
                alert('Your question has been successfully created');
            } else {
                formErrors(errorContainer, result.errors)
            }
        }).catch(error => alert(error));
    };
    // fetch and display all questions (Index)
    static async fetchQuestions() {
        await fetch(QUESTIONS).then(resp => resp.json()).then(result => {
            result.data.forEach(this.newQuestion);
        }).catch(error => alert(error));
        this.displayAllQuestions(Question.all);
    };
    static displayAllQuestions(questionsArray) {
        main.innerText = '';
        let sortedQuestions = [...questionsArray].sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        sortedQuestions.forEach(question => {
            let displayQuestion = question.renderQuestion();
            main.appendChild(displayQuestion)
        });

    };
    // handle data from fetch
    static newQuestion(fetchResult) {
        const id = fetchResult.id;
        const { author, title, body, topic, created_at } = fetchResult.attributes;
        Question.all.push(new Question(id, author, title, body, topic, created_at));

        Question.displayAllQuestions(Question.all);
    };
    // display one question and its answers (show)
    displayQuestion() {
        main.innerText = '';
        //const questionSelected = allQuestions.find(obj => obj.id === questionId);
        const displayQuestion = this.renderQuestion();
        displayQuestion.lastElementChild.innerText = ''

        const answerForm = Answer.answerForm(this.id);
        const replyButton = document.createElement('button');
        replyButton.innerText = 'Reply';
        replyButton.addEventListener('click', () => answerForm.classList.remove('hidden'));
        displayQuestion.lastElementChild.appendChild(replyButton);
        displayQuestion.className = 'show';
        const div = document.createElement('div');
        div.textContent = 'Answer(s):';
        div.className = 'answer';
        main.append(displayQuestion, answerForm, div);
        if (this.comments.length > 0) {
            this.comments.forEach(comment => {
                main.appendChild(comment.renderAnswer());
            });
        };

    };
    // delete question
    deleteQuestion() {
        if (confirm('would like to delete your question?')) {
            fetch(`${QUESTIONS}/${this.id}`, { method: 'DELETE' }).then(resp => {
                if (resp.ok) {
                    const position = Question.all.indexOf(this);
                    Question.all.splice(position, 1);
                    Answer.fetchAnswers();
                    Question.displayAllQuestions(Question.all)
                    alert('Your question was successfully deleted')
                } else {
                    const result = resp.json();
                    alert(result.error);
                }
            }).catch(error => alert(error))
        };
    };
    // filter Questions by topic
    static filterQuestions() {
        const selection = document.querySelector('select.topic');
        selection.addEventListener('change', () => {
            if (selection.value) {
                const filteredQuestions = Question.all.filter(question => question.topic === selection.value);
                if (filteredQuestions.length > 0) {
                    this.displayAllQuestions(filteredQuestions);
                } else {
                    alert("There's no question with the selected topic yet")
                };
            } else {
                this.displayAllQuestions(Question.all);
            };

        });
    };
    // render question on page
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
            const questionSelected = Question.all.find(obj => obj.id === action.parentNode.id);
            //const id = action.parentNode.id;
            if (action.innerText === 'view') {
                questionSelected.displayQuestion();
            } else if (action.innerText === 'delete') {
                // add code for deleting question
                questionSelected.deleteQuestion();
            };
        });
    };
};

Question.fetchQuestions();
Question.filterQuestions();