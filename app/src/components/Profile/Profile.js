/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../../utils/axiosPool';

// base page
import './profile.scss';

function Profile({ props }) {
  const userId = localStorage.getItem('id');
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const nowISO = props.timeNow;

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
      });
      setUser(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserActivities = async (id) => {
    try {
      const response = await axios.get(`/user/${id}/activity`);
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

  useEffect(() => {
    getUserById(userId);
  }, []);

  useEffect(() => {
    getUserActivities(userId);
  }, [props.profile]);

  const ListActivities = () => (
    <article className='listActivities_panel'>
      <ul className='activities-list'>
        {activities.map((activity) => {
          if (activity.id !== 404) {
            console.log(activity);
            return (
              <li
                key={activity.activity_id}
                className={`activity panel-block ${checkDate(
                  activity.activity_date,
                )}`}>
                <div className='column profil-picture'>
                  {activity.user_picture}
                </div>

                <div className='column activity-name'>
                  {activity.activity_name}
                </div>

                <div className='column activity-category'>
                  {activity.category_name}
                </div>

                <div className='column activity-city'>
                  {activity.activity_city}
                </div>

                <div className='column activity-date'>
                  {dayjs(activity.activity_date).format('DD/MM/YYYY')}
                </div>

                <div className='column activity-level'>
                  {activity.level_name}
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
            <figure className='avatar image is-128x128'>
              <img
                className='is-rounded'
                src='https://i.picsum.photos/id/779/200/200.jpg?hmac=qClHBmnKwT7Xt6flSVOh5Ax0tWLRo_gLVmwd4dkSVAo'
                alt='profile'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='profile-name title is-4'>
              {user.firstname} {user.lastname}
            </p>
            <p className='profile-presentation content'>
              {user.about === '' ? 'Aucune présentation' : user.about}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faPencil}
            className='icon_edit'
            onClick={() => alert('liens a faire')}
          />
        </div>
      </div>

      <div className='profile-activities'>
        <ListActivities />
      </div>
    </section>
  );
}

export default Profile;
