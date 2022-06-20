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
  commentId: PropTypes.number.isRequired,
  userFirstname: PropTypes.string.isRequired,
  commentContent: PropTypes.string.isRequired,
};
Comment.defaultProps = {
  className: '',
};
export default Comment;
