import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import Axios from '../../utils/axiosPool';

// base page
import './listActivities.scss';

function Activities({ props, funct }) {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [checkRemove, setCheckRemove] = useState(false);
  const [synchroMapList, setSynchroMapList] = useState(false);

  const checkSynchroMapList = () => {
    setSynchroMapList(!synchroMapList);
    funct.synchroRemoveListMap();
  };

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

  const levelDataRequest = async () => {
    try {
      const response = await Axios.get('/level/getAll');
      setLevels(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeActivity = async (id) => {
    try {
      const response = await Axios({
        method: 'delete',
        url: `/activity/${id}/manage`,
      });
      console.log(response);
      if (response.status === 200) {
        setCheckRemove(!checkRemove);
        checkSynchroMapList();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    ActivitiesDataRequest();
    getCategories();
    levelDataRequest();
  }, [props.resetSearch]);

  useEffect(() => {
    setActivities(props.searchResult);
  }, [props.searchResult]);

  useEffect(() => {
    ActivitiesDataRequest();
    getCategories();
    levelDataRequest();
  }, [checkRemove]);

  useEffect(() => {
    ActivitiesDataRequest();
    getCategories();
    levelDataRequest();
  }, [props.addActivity]);

  return (
    <article className='listActivities panel'>
      <ul className='activities-list'>
        {activities.map((activity) => {
          if (activity.id !== 404) {
            return (
              <li key={activity.id} className='activity panel-block'>
                <div className='activity-picto'>
                  {categories.map((category) => {
                    if (category.id === activity.id_category) {
                      if (category.picto === 'jeu') {
                        return (
                          <FontAwesomeIcon
                            icon={regular('chess-king')}
                            className='activity-picto'
                            key={Math.random()}
                            onClick={() => funct.handleActivity(activity)}
                          />
                        );
                      }
                      if (category.picto === 'sport') {
                        return (
                          <FontAwesomeIcon
                            icon={solid('person-running')}
                            className='activity-picto'
                            key={Math.random()}
                            onClick={() => funct.handleActivity(activity)}
                          />
                        );
                      }
                    }
                    return null;
                  })}
                </div>
                <div
                  className='text-info'
                  onClick={() => funct.handleActivity(activity)}>
                  <div className='column activity-name'>{activity.name}</div>
                  <div className='column activity-category'>
                    {categories.map((category) => {
                      if (category.id === activity.id_category) {
                        return category.name;
                      }
                      return null;
                    })}
                  </div>
                  <div className='column activity-level'>
                    {levels.map((level) => {
                      if (level.id === activity.level) {
                        return level.name;
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div
                  className='column activity-date'
                  onClick={() => funct.handleActivity(activity)}>
                  <FontAwesomeIcon
                    icon={regular('calendar')}
                    key={Math.random()}
                  />
                  {`le ${dayjs(activity.date).format('DD/MM/YYYY')}`}
                </div>
                <div
                  className='column activity-city'
                  onClick={() => funct.handleActivity(activity)}>
                  <FontAwesomeIcon
                    icon={solid('location-dot')}
                    key={Math.random()}
                  />
                  {activity.city}
                </div>
                {activity.id_user === JSON.parse(localStorage.getItem('id')) ? (
                  <div className='controle-activity'>
                    <FontAwesomeIcon
                      icon={solid('pencil')}
                      className='edit-activity'
                      onClick={() => funct.handleUpdateActivity(activity.id)}
                      key={Math.random()}
                    />
                    <FontAwesomeIcon
                      icon={solid('trash-alt')}
                      className='delete-activity'
                      onClick={() => removeActivity(activity.id)}
                      key={Math.random()}
                    />
                  </div>
                ) : null}
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
}

export default Activities;
