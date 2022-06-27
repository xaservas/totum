/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosPool';

// base component
import './activity.scss';
import CreateComment from '../CreateComment/CreateComment';
import Comment from '../Comment/Comment';

function Activity({ props, funct }) {
  const [activity, setActivity] = useState({});
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState();
  const [register, setRegister] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerId, setRegisterId] = useState(0);
  const [modalCreateComment, setModalCreateComment] = useState(false);
  const [checkNewComment, setCheckNewComment] = useState(false);

  const createComment = modalCreateComment ? 'isActive' : '';

  const getParticipants = async () => {
    try {
      const response = await Axios.get(
        `/activity/${props.activityContent.id}/user`,
      );
      setParticipants(response.data);
    } catch (error) {
      setParticipants([]);
    }
  };

  const getComments = async () => {
    try {
      const response = await Axios.get(
        `/comment/${props.activityContent.id}/activity`,
      );
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
          id_activity: props.activityContent.id,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsRegistered(true);
      setRegisterId(response.data.id);
    } catch (error) {
      setIsRegistered(false);
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
      getRegister();
      setIsRegistered(true);
      getParticipants();
    } catch (error) {
      throw new Error(error);
    }
  };

  const unregisterToActivity = async () => {
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
      getRegister();
      setIsRegistered(false);
      getParticipants();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleModalCreateComment = () => {
    setModalCreateComment(!modalCreateComment);
  };

  const handleCheckNewComment = () => {
    setCheckNewComment(!checkNewComment);
  };

  useEffect(() => {
    if (Object.keys(props.activityContent).length !== 0) {
      setActivity(props.activityContent);
      getParticipants();
      getComments();
      getRegister();
      setRegister({
        id_user: JSON.parse(localStorage.getItem('id')),
        id_activity: props.activityContent.id,
      });
    }
  }, [props.activityContent]);

  useEffect(() => {
    if (Object.keys(props.activityContent).length !== 0) {
      getComments();
    }
  }, [checkNewComment]);

  useEffect(() => {
    if (Object.keys(props.activityContent).length !== 0) {
      getRegister();
      setRegister({
        id_user: JSON.parse(localStorage.getItem('id')),
        id_activity: props.activityContent.id,
      });
    }
  }, [props.isLogged]);

  const ButtonComment = () => (
    <button className='button-com is-primary' onClick={handleModalCreateComment}>

      Commenter
    </button>
  );

  const ButtonRegister = () => (
    <aside className='content-button'>
      <button
        className='button-par is-primary'
        onClick={() => registerToActivity()}>

        Je veux participer
      </button>
      <div className='trait'></div>
      <ButtonComment />
    </aside>
  );

  const ButtonUnregister = () => (
    <aside className='content-button'>
      <button
        className='button-cancel is-primary is-link'
        onClick={unregisterToActivity}>

        Je ne veux plus participer
      </button>
      <div className='trait'></div>
      <ButtonComment />
    </aside>
  );

  const ButtonLogin = () => (
    <aside className='content-button'>
      <button
        className='button-connexion is-primary is-link'
        onClick={() => funct.handleLogin()}>
        Connexion
      </button>

    </aside>
  );

  const ButtonActivityFull = () => (
    <aside className='content-button'>
      <button className='button-full is-primary is-warning'>

        Activité complète
      </button>
      <div className='trait'></div>
      <ButtonComment />
    </aside>
  );

  return (
    <article className='container_activity'>

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
        <div className='trait'></div>

        <aside className='content-info'>
          <p className='content-description'>{activity.description}</p>
          <div className='trait'></div>
          <p className='activity__participants'>
            <span className='participant'>participants</span>{' '}
            {participants.length}/{activity.max_participants}
          </p>
          <progress
            className='progressbar progress box'
            value={participants.length}
            max={activity.max_participants}></progress>
        </aside>

        {(() => {
          switch (props.isLogged) {
            case true: {
              if (isRegistered) {
                return <ButtonUnregister />;
              }
              if (participants.length >= activity.max_participants) {
                return <ButtonActivityFull />;
              }
              return <ButtonRegister />;
            }

            case false: {
              return <ButtonLogin />;
            }
            default: {
              return <ButtonLogin />;
            }
          }
        })()}

        <section className='activity__comments box'>
          {comments
            && comments.map((comment) => (
              <Comment key={comment.comment_id || 0} comment={comment} />
            ))}
        </section>
        <section className={`${createComment} activity__create-comment`}>
          <CreateComment
            closeModal={handleModalCreateComment}
            comments={handleCheckNewComment}
            updateComment={getComments}
            activityContent={props.activityContent}
          />
        </section>

    </article>
  );
}

export default Activity;
