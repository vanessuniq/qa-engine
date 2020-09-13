let allAnswers = [];
class Answer extends Post {
    constructor(id, author, body, created_at, question_id) {
        super(id, author, body, created_at);
        this._question_id = question_id;
    };
    get question_id() {
        return this._question_id;
    };
    set body(body) {
        this._body = body;
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
    }
};
Answer.fetchAnswers();