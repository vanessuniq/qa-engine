let allAnswers = [];
class Answer extends Post {
    constructor(id, author, body, created_at, question_id) {
        super(id, author, body, created_at);
        this._question_id = question_id;
    };
    get question_id() {
        return this._question_id;
    };
    // handle data from fetch
    static newAnswer(fetchResult) {
        const id = fetchResult.id;
        const { author, body, created_at, question_id } = fetchResult.attributes;
        allAnswers.push(new Answer(id, author, body, created_at, question_id));
    };
    // fetch answers and save in allAnswers
    static async fetchAnswers() {
        await fetch(ANSWERS).then(resp => resp.json()).then(result => {
            result.data.forEach(Answer.newAnswer);
        }).catch(error => alert(error));
    };
    // render answer
    renderAnswer() {
        const answer = this.renderPost();
        answer.className = 'show';
        answer.classList.add('ans');
        const divButton = this.postAction('edit');
        this.answerEvent(divButton);
        answer.appendChild(divButton);
        return answer;
    };
    // edit answer
    saveEditedAnswer(action) {
        this.body = action.parentNode.previousSibling.value;
        fetch(`${ANSWERS}/${this.id}`, config('PATCH', { answer: { body: this.body } }))
            .then(resp => {
                if (resp.ok) {
                    action.innerText = 'edit';
                    action.parentNode.previousSibling.setAttribute('readonly', true);
                    action.parentNode.previousSibling.style.background = 'lightgrey'
                    alert('Answer was successfully edited')
                } else {
                    const result = resp.json();
                    alert(result.error);
                }
            }).catch(error => alert(error));
    };
    // delete answer
    deleteAnswer() {
        if (confirm('would like to delete your answer')) {
            fetch(`${ANSWERS}/${this.id}`, { method: 'DELETE' }).then(resp => {
                if (resp.ok) {
                    const questionId = this.question_id.toString()
                    const position = allAnswers.indexOf(this);
                    allAnswers.splice(position, 1);
                    Question.displayQuestion(questionId);
                    alert('answer was successfully deleted')
                } else {
                    const result = resp.json();
                    alert(result.error);
                }
            }).catch(error => alert(error))
        };
    };
    // answer event
    answerEvent(element) {
        element.addEventListener('click', event => {
            const action = event.target;
            const id = action.parentNode.id;
            const answer = allAnswers.find(obj => obj.id === id);
            if (action.innerText === 'edit') {
                action.innerText = 'save';
                action.parentNode.previousSibling.removeAttribute('readonly');
                action.parentNode.previousSibling.style.background = 'transparent';

            } else if (action.innerText === 'save') {
                answer.saveEditedAnswer(action);
            } else {
                // add code for deleting question
                answer.deleteAnswer();
            };
        });
    };
};
Answer.fetchAnswers();