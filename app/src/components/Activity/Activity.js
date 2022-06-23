import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosPool';

// base component
import './activity.scss';
import CreateComment from '../CreateComment/CreateComment';
import Comment from '../Comment/Comment';

function Activity({ props }) {
  const [activity, setActivity] = useState({});
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState();
  const [register, setRegister] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerId, setRegisterId] = useState(0);

  const getParticipants = async () => {
    try {
      const response = await Axios.get(`/activity/${props.idActivity}/user`);
      setParticipants(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await Axios.get(`/comment/${props.idActivity}/activity`);
      setComments(response.data);
    } catch (error) {
      setComments([
        {
          comment_content: 'Pas encore de commentaires',
        },
      ]);
    }
  };

  const getRegister = async () => {
    try {
      const response = await Axios({
        method: 'post',
        url: '/register/getForUser',
        data: {
          id_user: JSON.parse(localStorage.getItem('id')),
          id_activity: props.idActivity,
        },
      });
      console.log(response.data);
      setIsRegistered(true);
      setRegisterId(response.data.id);
    } catch (error) {
      console.log(error);
      setIsRegistered(false);
    }
  };

  const getActivity = async () => {
    try {
      const response = await Axios.get(`/activity/${props.idActivity}/manage`);
      setActivity(response.data);
      getParticipants();
      getComments();
      getRegister();
    } catch (error) {
      throw new Error(error);
    }
  };

  const registerToActivity = async () => {
    try {
      await Axios({
        method: 'post',
        url: '/register',
        data: register,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsRegistered(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const unregisterToActivity = async () => {
    console.log(registerId);
    try {
      await Axios({
        method: 'delete',
        url: `/register/${registerId}/manage`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsRegistered(false);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getActivity();
  }, [props.idActivity]);

  return (
    <article className='container_activity'>
      <div className='left'>
        <header className='card-header has-text-centered'>
          <p className='activity__name card-header-title'>{activity.name}</p>
          {/* <p className='activity-level'>{activity.level}</p> */}
        </header>
        <aside className='card-content'>
          <div className='content'>
            <span className='picto-calendar'></span>
            <p className='activity-date'>{activity.date}</p>
          </div>
          <div className='content'>
            <span className='picto-geo'></span>
            <p className='activity-address'>{activity.address}</p>
          </div>
        </aside>

        <aside class='content-info'>
          <p className='content-description'>{activity.description}</p>
          <p className='activity__participants'>
            <span class='participant'>participants</span> {participants.length}/
            {activity.max_participants}
          </p>
          <progress
            className='activity__takeholders progress box is-success'
            value={participants.length}
            max={activity.max_participants}></progress>
        </aside>
      </div>

      <div className='right'>
        <aside className='content-button'>
          {isRegistered ? (
            <button
              className='button is-primary is-link'
              onClick={unregisterToActivity}>
              Je ne veux plus participer
            </button>
          ) : (
            <button
              className='button is-primary'
              onClick={() => registerToActivity()}>
              Je veux participer
            </button>
          )}
          <button className='button is-primary'>Commenter</button>
        </aside>
        <section className='activity__comments box'>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
        </section>
      </div>
    </article>
  );
}

export default Activity;
