'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentForm = function (_React$Component) {
    _inherits(CommentForm, _React$Component);

    function CommentForm() {
        _classCallCheck(this, CommentForm);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentForm).call(this));

        _this.state = { author: '', text: '' };
        return _this;
    }

    _createClass(CommentForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return r('form.commentForm', {
                onSubmit: function onSubmit(e) {
                    return _this2.handleSubmit(e);
                }
            }, r('input[type=text]', {
                placeholder: 'Your name',
                value: this.state.author,
                onChange: function onChange(e) {
                    return _this2.setState({ author: e.target.value });
                }
            }), r('input[type=text]', {
                placeholder: 'Say something...',
                value: this.state.text,
                onChange: function onChange(e) {
                    return _this2.setState({ text: e.target.value });
                }
            }), r('input[type=submit]', { value: 'Post' }));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var author = this.state.author.trim();
            var text = this.state.text.trim();
            if (!text || !author) return;
            this.props.onCommentSubmit({ author: author, text: text });
            this.setState({ author: '', text: '' });
        }
    }]);

    return CommentForm;
}(React.Component);

var Comment = function (_React$Component2) {
    _inherits(Comment, _React$Component2);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
    }

    _createClass(Comment, [{
        key: 'render',
        value: function render() {
            return r('.comment', r('h2.commentAuthor', this.props.author), this.props.children);
        }
    }]);

    return Comment;
}(React.Component);

var CommentList = function (_React$Component3) {
    _inherits(CommentList, _React$Component3);

    function CommentList() {
        _classCallCheck(this, CommentList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentList).apply(this, arguments));
    }

    _createClass(CommentList, [{
        key: 'render',
        value: function render() {
            return r('.commentList', this.props.data.map(function (comment) {
                return r(Comment, {
                    author: comment.author,
                    key: comment.id
                }, comment.text);
            }));
        }
    }]);

    return CommentList;
}(React.Component);

var CommentBox = function (_React$Component4) {
    _inherits(CommentBox, _React$Component4);

    _createClass(CommentBox, [{
        key: 'render',
        value: function render() {
            return r('.commentBox', r('h1', 'Comments'), r(CommentList, { data: this.state.data }), r(CommentForm, { onCommentSubmit: this.handleCommentSubmit.bind(this) }));
        }
    }]);

    function CommentBox() {
        _classCallCheck(this, CommentBox);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentBox).call(this));

        _this5.state = { data: [] };
        return _this5;
    }

    _createClass(CommentBox, [{
        key: 'handleCommentSubmit',
        value: function handleCommentSubmit(comment) {
            var _this6 = this;

            comment.id = Date.now();
            var json = this.state.data;
            this.setState({ data: json.concat(comment) });

            $.post(this.props.url, comment, function (err, data) {
                return _this6.setState({ data: err ? json : data });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this7 = this;

            $.get(this.props.url, function (err, data) {
                return err || _this7.setState({ data: data });
            });
        }
    }]);

    return CommentBox;
}(React.Component);

var el = document.getElementById('app');
ReactDOM.render(r(CommentBox, { url: '/cgi-bin/api.py/comments' }), el);
