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
    // answer event
    answerEvent(element) {
        element.addEventListener('click', event => {
            const action = event.target;
            const id = action.parentNode.id;
            if (action.innerText === 'edit') {
                action.innerText = 'save';
                action.parentNode.previousSibling.removeAttribute('readonly');

            } else if (action.innerText === 'save') {
                const answer = allAnswers.find(obj => obj.id === id);
                answer.body = action.parentNode.previousSibling.value;
                fetch(`${ANSWERS}/${id}`, config('PATCH', { answer: { body: answer.body } }))
                    .then(resp => {
                        if (resp.ok) {
                            action.innerText = 'edit';
                            action.parentNode.previousSibling.setAttribute('readonly', true);
                        } else {
                            const result = resp.json();
                            alert(result);
                        }
                    });
            } else {
                // add code for deleting question
            };
        });
    };
};
Answer.fetchAnswers();