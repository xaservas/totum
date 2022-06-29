/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
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
  const [categories, setCategories] = useState([]);

  const createComment = modalCreateComment ? 'isActive' : '';

  const getCategories = async () => {
    try {
      const response = await Axios.get('/category/categories');
      setCategories(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

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
      getCategories();
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
    <button
      className='button-com'
      onClick={handleModalCreateComment}>
      Commenter
    </button>
  );

  const ButtonRegister = () => (
    <aside className='content-button'>
      <button
        className='button-par'
        onClick={() => registerToActivity()}>
        Je veux participer
      </button>
      <ButtonComment />
    </aside>
  );

  const ButtonUnregister = () => (
    <aside className='content-button'>
      <button
        className='button-cancel'
        onClick={unregisterToActivity}>
        Je ne veux plus participer
      </button>
      <ButtonComment />
    </aside>
  );

  const ButtonLogin = () => (
    <aside className='content-button'>
      <button
        className='button-connexion'
        onClick={() => funct.handleLogin()}>
        Connexion
      </button>
    </aside>
  );

  const ButtonActivityFull = () => (
    <aside className='content-button'>
      <button className='button-full'>
        Activité complète
      </button>
      <ButtonComment />
    </aside>
  );

  return (
    <article className='activity__card'>
      <header className='activity__card--header'>
          {categories.map((category) => {
            if (category.id === activity.id_category) {
              if (category.picto === 'jeu') {
                return (
                  <FontAwesomeIcon
                    icon={regular('chess-king')}
                    key={(activity.id, category.id)}
                    className='activity-picto'
                  />
                );
              }
              if (category.picto === 'sport') {
                return (
                  <FontAwesomeIcon
                    icon={solid('person-running')}
                    key={(activity.id, category.id)}
                    className='activity-picto'
                  />
                );
              }
            }
            return null;
          })}
          <p>{activity.name}
          </p>
          <FontAwesomeIcon
            icon={regular('circle-xmark')}
            onClick={() => funct.closeActivity()}
            className='activity-close'
          />
      </header>
      <aside className='card-content'>
        <div className='content'>
          <FontAwesomeIcon icon={regular('calendar')} />
          <p className='activity-date'>
            {`le ${dayjs(activity.date).format('DD/MM/YYYY')}`}
          </p>
        </div>
        <div className='content'>
          <FontAwesomeIcon icon={solid('location-dot')} />
          <p className='address'>{`${activity.address}, ${activity.zip_code} ${activity.city}`}</p>
        </div>
      </aside>
      <aside className='content-info'>
        <p className='content-description'>"{activity.description}"</p>

        <section className='activity__participants'>
          <p className='participants__unit'>Nombre de participants:</p>
          <p className='participants_value'>
            {participants.length}/{activity.max_participants}
          </p>
        </section>
        <progress
          className='progressbar'
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

      <section className='activity__card__comments'>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.comment_id || 0} comment={comment} />
          ))}
      </section>
      <section className={`${createComment} activity__card__create--comment`}>
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
