import React from 'react';
import PropTypes from 'prop-types';
import './createComment.scss';
import axios from '../../utils/axiosPool';

function CreateComment() {
  return (
    <form className={'createComment'} onSubmit>
      <h2>laissez un comentaire</h2>
      <div className='field'>
        <div className='control'>
          <textarea
            className='textarea'
            type='text'
            name='content'
            placeholder='Description'
            value
            onChange
          />
        </div>
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

export default CreateComment;
