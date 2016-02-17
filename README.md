
# A mithril.js m()-like convenience function for React.  

Instead of using JSX, the convenience function r(), provided in r.js, can be used to code the virtual DOM.  For example, the JSX code

    return (
      <div className="commentBox">
        <h1 className="comments">Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );

can be replaced with

    return r('.commentBox', 
        r('h1.comments', 'Comments'),
        r(CommentList, { data: this.state.data }),
        r(CommentForm, { onCommentSubmit: this.handleCommentSubmit.bind(this) })
    );

Run 'make' to see the example.  I believe some people will prefer it over JSX.


- George



