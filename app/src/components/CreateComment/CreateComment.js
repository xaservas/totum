import { useEffect, useState } from 'react';
import './createComment.scss';
import Axios from '../../utils/axiosPool';

function CreateComment({
  closeModal,
  comments,
  activityContent,
  updateComment,
}) {
  const [contentComment, setContentComment] = useState('');
  const [sendComment, setSendComment] = useState(false);

  const showButton = sendComment ? 'isActive' : '';

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
          id_activity: activityContent.id,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      comments();
      setContentComment('');
      setSendComment(false);
      updateComment();
      closeModal();
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (contentComment.length > 0) {
      setSendComment(true);
    } else {
      setSendComment(false);
    }
  }, [contentComment]);

  return (
    <form className={'createComment'} onSubmit>
      <div className='field'>
        <div className='content-comment'>
          <textarea
            className='textarea'
            type='text'
            name='content'
            placeholder=''
            value={contentComment}
            onChange={(e) => setContentComment(e.target.value)}
          />
        </div>
      </div>
      <div className='field is-grouped'>
        <p className={`${showButton} control`}>
          <button
            className='button is-primary'
            type='submit'
            onClick={handleSubmit}>
            Submit
          </button>
        </p>
      </div>
    </form>
  );
}

export default CreateComment;
