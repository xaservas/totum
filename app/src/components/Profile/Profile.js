/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../../utils/axiosPool';

// base page
import './profile.scss';

function Profile({ props, funct }) {
  const userId = localStorage.getItem('id');
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [creator, setCreator] = useState([]);
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
      const response = await axios({
        method: 'get',
        url: `/user/${id}/activity`,
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

  const getActivities = async () => {
    try {
      const response = await axios.get('/activities');
      setAllActivities(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getCreators = () => {
    const creators = [];
    try {
      allActivities.map(async (activity) => {
        const response = await axios.get(`user/${activity.id_user}/manage`);
        creators.push(response.data);
      });
      setCreator(creators);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getUserById(userId);
  }, []);

  useEffect(() => {
    getUserActivities(userId);
    getActivities();
    getCreators();
  }, [props.profile]);

  const ListActivities = () => (
    <article className='listActivities_panel'>
      <ul className='activities-list'>
        {activities.map((activity) => {
          if (activity.id !== 404) {
            return (
              <li
                key={activity.activity_id}
                className={`activity panel-block ${checkDate(
                  activity.activity_date,
                )}`}>
                <div className='column profil-picture'>
                  {console.log(activity.activity_id)}
                  {creator.map((userCreator) => {
                    if (userCreator.id === activity.activity_id) {
                      console.log('yep');
                      return 'gnangnaed';
                    }
                    console.log('nope');
                    return null;
                  })}
                </div>

                <div className='column activity-name'>
                  {activity.activity_name}
                </div>

                <div className='column activity-category'>
                  {activity.category_name}
                </div>

                <div className='column activity-city'>
                  {allActivities.map((activityDetail) => {
                    if (activityDetail.id === activity.activity_id) {
                      return activityDetail.city;
                    }
                    return null;
                  })}
                </div>

                <div className='column activity-date'>
                  {allActivities.map((activityDetail) => {
                    if (activityDetail.id === activity.activity_id) {
                      return `le ${dayjs(activityDetail.date).format(
                        'DD/MM/YYYY',
                      )}`;
                    }
                    return null;
                  })}
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
        </div>
      </div>

      <div className='profile-activities'>
        <ListActivities />
      </div>
    </section>
  );
}

export default Profile;
