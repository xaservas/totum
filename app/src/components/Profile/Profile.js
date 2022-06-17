import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosPool'
import data from '../../data/activities';
import './profile.scss';
import ListActivities from '../ListActivities/ListActivities';

function Profile({ ...rest }) {
  const userId = localStorage.getItem('id');
  const [user, setUser] = React.useState([]);
  const [activities, setActivities] = React.useState([]);

  const getUserById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/manage`,
      });
      return (response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserActivities = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/activity`,
      });
      return (response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(getUserById(userId));
    setActivities(getUserActivities(userId));
    console.log(user);
    console.log(activities);
  }, []);

  return (
    <section className={'profile card'} {...rest}>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='avatar image is-128x128'>
              <img
                className='is-rounded'
                src='https://dodoodad.com/wp-content/uploads/2021/01/Untitled-2-57.jpg'
                alt='profile'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='profile-name title is-4'>John Doe</p>
            <p className='profile-presentation content'>
              {' '}
              Bâtard de torvisse de colon de cossin de gériboire de cochonnerie
              de christie de saint-sacrament de Jésus Marie Joseph.
            </p>
          </div>
        </div>
      </div>

      <div className='profile-activities'>
        <ListActivities activities={data} list_type={'Activités prévues'} />
        <ListActivities activities={data} list_type={'Activités passées'} />
      </div>
    </section>
  );
}

Profile.propTypes = {
  className: PropTypes.string,
};
Profile.defaultProps = {
  className: '',
};
export default Profile;
