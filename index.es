
class CommentForm extends React.Component {
    constructor(){
        super();
        this.state = { author: '', text: '' };
    }
    render(){
        return r('form.commentForm', {
                onSubmit: e => this.handleSubmit(e)
            },
            r('input[type=text]', {
                placeholder: 'Your name',
                value: this.state.author,
                onChange: e => this.setState({ author: e.target.value })
            }),
            r('input[type=text]', {
                placeholder: 'Say something...',
                value: this.state.text,
                onChange: e => this.setState({text: e.target.value})
            }),
            r('input[type=submit]', { value: 'Post' }));
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) return;
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({ author: '', text: '' });
    }
}

class Comment extends React.Component {
    render(){
        return r('.comment',
            r('h2.commentAuthor', this.props.author),
            this.props.children)
    }
}

class CommentList extends React.Component {
    render(){
        return r('.commentList',
            this.props.data.map(function(comment) {
                return r(Comment, { 
                    author: comment.author, 
                    key: comment.id
                }, comment.text)
            }))
    }
}

class CommentBox extends React.Component {
    render(){
        return r('.commentBox', 
            r('h1', 'Comments'),
            r(CommentList, { data: this.state.data }),
            r(CommentForm, { onCommentSubmit: this.handleCommentSubmit.bind(this) }));
    }
    constructor(){
        super();
        this.state = { data: [] };
    }
    handleCommentSubmit(comment) {
        comment.id = Date.now();
        var json = this.state.data;
        this.setState({ data: json.concat(comment) });

        $.post(this.props.url, comment, (err, data) =>
            this.setState({ data: err ? json : data })
        );
    }
    componentDidMount() {
        $.get(this.props.url, (err, data) =>
            err || this.setState({ data: data }));
    }
}

var el = document.getElementById('app');
ReactDOM.render(r(CommentBox, { url: '/cgi-bin/api.py/comments' }), el);



