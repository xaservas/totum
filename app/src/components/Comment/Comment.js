import './comment.scss';

function Comment({ comment }) {
  return (
    <article key={comment.comment_id} className='comment message is-small'>
      <div className='message-header'>
        <p>{comment.user_firstname}</p>
      </div>
      <div className='comment message'>
        <p className='comment-message-body'>{comment.comment_content}</p>
      </div>
    </article>
  );
}

export default Comment;
