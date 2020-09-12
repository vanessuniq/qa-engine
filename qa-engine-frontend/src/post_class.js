class Post {
    constructor(id, author, body, created_at) {
        this._id = id;
        this._author = author;
        this._body = body;
        this._created_at = created_at
    };
    get id() {
        return this._id;
    };
    get author() {
        return this._author;
    };
    get body() {
        return this._body;
    };
    get created_at() {
        return this._created_at;
    };

    dateFormat() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(this.created_at).toLocaleDateString('en-US', options)
    };
    // render individual post
    renderPost() {
        let post = document.createElement('div');
        post.className = 'question'

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

        post.append(user, content);
        return post
    };
    // post action: view, edit, delete
    postAction(action, action1 = 'delete') {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = 'actions';
        [action, action1].forEach(string => {
            const element = document.createElement('button');
            element.className = 'action';
            element.textContent = string;
            if (string === 'view' || string === 'edit') {
                element.style.color = 'blue';
            } else {
                element.style.color = 'red';
            };
            div.appendChild(element);
        });
        return div;
    };

}