import React from 'react';
import PropTypes from 'prop-types';
import './createComment.scss';
import axios from '../../utils/axiosPool';

function CreateComment({ activityId, ...rest }) {
  const userId = localStorage.getItem('id');
  const [comment, setComment] = React.useState({
    content: 'string',
    picture: 'string',
    id_user: userId,
    id_activity: activityId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((previousComment) => ({
      ...previousComment,
      [name]: value,
    }));
    console.log(comment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment);
    try {
      const response = await axios({
        method: 'post',
        url: '/comment/createNew',
        data: {
          ...comment,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // console.log(activity)
  };

  return (
    <form className={'createComment'} onSubmit={handleSubmit}>
      <h2>laissez un comentaire</h2>
      <div className='field'>
        <div className='control'>
          <textarea
            className='textarea'
            type='text'
            name='content'
            placeholder='Description'
            value={comment.content}
            onChange={handleChange}
          />
        </div>
      </div>
      <div class='file'>
        <label class='file-label'>
          <input class='file-input' type='file' name='resume' />
          <span class='file-cta'>
            <span class='file-label'>joindre une photo</span>{' '}
            {/* à voir la façon la plus pertinente de joindre une photo à un com */}
          </span>
        </label>
      </div>
      <div className='field is-grouped'>
        <p className='control'>
          {/* redirect to the activity page */}

          <button className='button is-primary' type='submit'>
            Submit
          </button>
        </p>
        <p className='control'>
          {/* redirect to root */}

          <button className='button is-light'>Cancel</button>
        </p>
      </div>
    </form>
  );
}

CreateComment.propTypes = {
  className: PropTypes.string,
  activityId: PropTypes.number.isRequired,
};
CreateComment.defaultProps = {
  className: '',
};
export default CreateComment;
