import React from 'react';
import PropTypes from 'prop-types';
import './comment.scss';

function Comment({
  commentId,
  userFirstname,
  commentContent,
  ...rest
}) {
  return (
    <article key ={commentId} className={'comment message is-small'} {...rest}>
      <div className='message-header'>
        <p>{userFirstname}</p>
      </div>
      <div className='comment message-body'>{commentContent}</div>
    </article>
  );
}

Comment.propTypes = {
  className: PropTypes.string,
  commentId: PropTypes.number,
  userFirstname: PropTypes.string,
  commentContent: PropTypes.string,
};
Comment.defaultProps = {
  className: '',
  commentId: '',
  userFirstname: '',
  commentContent: '',
};
export default Comment;
