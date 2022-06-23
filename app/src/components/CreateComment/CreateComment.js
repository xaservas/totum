import { useState } from 'react';
import './createComment.scss';
import Axios from '../../utils/axiosPool';

function CreateComment({ closeModal, comments, activityId }) {
  const [contentComment, setContentComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Axios({
        method: 'post',
        url: '/comment/createNew',
        data: {
          content: contentComment,
          picture: 'picture',
          id_user: JSON.parse(localStorage.getItem('id')),
          id_activity: activityId,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      comments();
      setContentComment('');
    } catch (error) {
      throw new Error(error);
    }
  };

  const resetButton = () => {
    setContentComment('');
    closeModal();
  };

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
            value={contentComment}
            onChange={(e) => setContentComment(e.target.value)}
          />
        </div>
      </div>
      <div className='field is-grouped'>
        <p className='control'>
          <button
            className='button is-primary'
            type='submit'
            onClick={handleSubmit}>
            Submit
          </button>
        </p>
        <p className='control'>
          <button
            className='button is-light'
            type='reset'
            onClick={() => resetButton()}>
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
}

export default CreateComment;
