import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './listActivities.scss';
import { getAllActivities } from '../../utils/axiosPool';

function ListActivities({ propActivities, listType, ...rest }) {
  const [activities, setActivities] = useState([]);

  /*
  const ActivitiesDataRequest = async () => {
    try {
      const result = await axios({
        method: 'get',
        url: '/activities',
      });
      console.log(result.data);
      setActivities(result.data);
    } catch (error) {
      console.log(error);
    }
  };
*/

  const loadDefaultData = async () => {
    try {
      const result = await getAllActivities();
      if (result) {
        setActivities(result);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    loadDefaultData();
  }, []);

  return (
    <article className={'listActivities panel'} {...rest}>
      <p className='activities-title panel-heading'>{listType}</p>
      <ul className='activities-list'>
        {activities.map((activity) => (
          <li key={activity.id} className='activity panel-block'>
            <div className='column activity-name'>{activity.name}</div>
            <div className='column activity-date'>{activity.date}</div>
            <div className='column activity-city'>{activity.city}</div>
          </li>
        ))}
      </ul>
    </article>
  );
}

ListActivities.propTypes = {
  className: PropTypes.string,
  list_type: PropTypes.string,
  propActivities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
      city: PropTypes.string,
    }),
  ),

};

ListActivities.defaultProps = {
  className: '',
  list_type: 'Toutes les activités',
  id: '',
  name: '',
  date: '',
  city: '',
};
export default ListActivities;
