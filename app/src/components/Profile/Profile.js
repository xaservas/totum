import { useState, useEffect } from 'react';
import axios from '../../utils/axiosPool';

// base page
import './profile.scss';
import ListActivities from '../ListActivities/ListActivities';

function Profile({ props, funct }) {
  const userId = localStorage.getItem('id');
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);

  const getUserById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/manage`,
      });
      setUser(response.data);
      return response.data;
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
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getUserById(userId);
    getUserActivities(userId);
  }, []);

  return (
    <section className='profil_card'>
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
        {/* <ListActivities activities={data} list_type={'Activités prévues'} />
        <ListActivities activities={data} list_type={'Activités passées'} /> */}
      </div>
    </section>
  );
}

export default Profile;
