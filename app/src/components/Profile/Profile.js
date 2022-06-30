/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../../utils/axiosPool';

// base page
import './profile.scss';

function Profile({ props, funct, synchro }) {
  const userId = JSON.parse(localStorage.getItem('id'));
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const nowISO = props.timeNow;
  const [showActivitiesList, setShowActivitiesList] = useState(false);
  const pictures = props.usersPictures;

  const handleActivitiesList = () => {
    setShowActivitiesList(!showActivitiesList);
  };

  const showThat = showActivitiesList ? 'hiddenActivities' : '';

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const checkDate = (date) => {
    if (date < nowISO) {
      return 'past';
    }
    return 'future';
  };

  const getUserById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/manage`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserActivities = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/activity`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setActivities(response.data);
    } catch (error) {
      setActivities([
        {
          id: 404,
          name: 'Aucune activité',
        },
      ]);
    }
  };

  const showActivity = async (id) => {
    try {
      const response = await axios.get(`/activity/${id}/manage`);
      funct.handleActivity(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getUserById(userId);
  }, [userId]);

  useEffect(() => {
    getUserActivities(userId);
  }, [userId, synchro]);

  const ListActivities = () => (
    <article className='listActivities_panel'>
      <ul className='activities-list'>
        {activities.map((activity, i) => {
          if (activity.id !== 404) {
            return (
              <li
                onClick={() => showActivity(activity.activity_id)}
                key={activity.activity_id}
                className={`activity panel-block ${checkDate(
                  activity.activity_date,
                )}`}>
                <div className='column profil-picture'>
                  {pictures.map((picture, j) => {
                    if (j === i) {
                      return (
                        <img
                          src={picture.picture.large}
                          alt='profile'
                          className='profile-picture'
                        />
                      );
                    }
                    return null;
                  })}
                </div>

                <div className='text-info'>
                  <div className='column activity-name'>
                    {activity.activity_name}
                  </div>
                  <div className='column activity-category'>
                    {activity.category_name}
                  </div>
                  <div className='column activity-level'>
                    {activity.level_name}
                  </div>
                </div>

                <div className='column activity-date'>
                  <FontAwesomeIcon icon={regular('calendar')} />
                  {dayjs(activity.activity_date).format('DD/MM/YYYY')}
                </div>

                <div className='column activity-city'>
                  <FontAwesomeIcon icon={solid('location-dot')} />
                  {activity.activity_city}
                </div>
              </li>
            );
          }
          return (
            <li key={activity.id} className='activity panel-block'>
              <div className='column activity-name'>{activity.name}</div>
            </li>
          );
        })}
      </ul>
    </article>
  );

  return (
    <section className='profil_card'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='avatar image'>
              <img
                className='is-rounded'
                src='https://i.picsum.photos/id/779/200/200.jpg?hmac=qClHBmnKwT7Xt6flSVOh5Ax0tWLRo_gLVmwd4dkSVAo'
                alt='profile'
              />
              <FontAwesomeIcon
                icon={solid('pencil')}
                className='edit-profil'
                onClick={() => funct.handleParameters()}
              />
              <FontAwesomeIcon
                icon={regular('circle-xmark')}
                onClick={() => funct.closeAllModal()}
                className='activity-close'
              />
              <FontAwesomeIcon
                icon={solid('bars')}
                onClick={() => { handleActivitiesList(); props.mainListActivities ? funct.handleListMainActivities(): console.log('rien'); }}//trying to close activitieslist if it's open
                className='activity-handle'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='profile-name title is-4'>
              {capitalize(user.firstname)} {capitalize(user.lastname)}
            </p>
            <p className='profile-city content'>{`${capitalize(
              user.city,
            )}, ${capitalize(user.country)}`}</p>
          </div>
          <div className='media-about'>
            <p className='profile-presentation content'>
              {user.about === '' ? 'Aucune présentation' : user.about}
            </p>
          </div>
        </div>
      </div>

      <div className={`profile-activities ${showThat}`}>
        <ListActivities />
      </div>
    </section>
  );
}

export default Profile;
