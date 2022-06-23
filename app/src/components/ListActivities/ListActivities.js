import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';

// base page
import './listActivities.scss';

function Activities({ props, funct }) {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await Axios.get('/category/categories');
      setCategories(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const ActivitiesDataRequest = async () => {
    try {
      const response = await Axios.get('/activities');
      setActivities(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    ActivitiesDataRequest();
    getCategories();
  }, [props.resetSearch]);

  useEffect(() => {
    setActivities(props.searchResult);
  }, [props.searchResult]);

  return (
    <article className='listActivities panel'>
      <p className='activities-title panel-heading'></p>
      <ul className='activities-list'>
        {activities.map((activity) => (
          <li key={activity.id} className='activity panel-block'
            onClick={() => funct.handleActivity(activity.id)}>

            <div className='column activity-category'>
              {categories.map((category) => {
                if (category.id === activity.id_category) {
                  return (
                    <span key={category.id} className='activity-category-name'>
                      {category.name}
                    </span>
                  );
                } return null;
              })}
            </div>
            <div className='column activity-name'>{activity.name}</div>
            <div className='column activity-description'>
              {activity.description}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Activities;
