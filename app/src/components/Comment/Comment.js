import React from 'react';
import PropTypes from 'prop-types';
import './comment.scss';

function Comment({ ...rest }) {
  return (
    <article key ={id} className={'comment message is-small'} {...rest}>
      <div className='message-header'>
        <p>{user_firstname}</p>
      </div>
      <div className='comment message-body'>{comment_content}</div>
    </article>
  );
}

Comment.propTypes = {
  className: PropTypes.string,
};
Comment.defaultProps = {
  className: '',
};
export default Comment;
