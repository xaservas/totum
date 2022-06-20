import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';
import './desktop.scss';

import Map from '../Map/Map';

function Desktop() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  //   const [search, setSearch] = useState({
  //     category: '',
  //     level: '',
  //     search: '',
  //     });
  //   }

  const ActivitiesDataRequest = async () => {
    try {
      const response = await Axios.get('/activities');
      setActivities(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const CategoriesDataRequest = async () => {
    try {
      const response = await Axios.get('/category/categories');
      setCategories(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  console.log(categories);

  const LevelsDataRequest = async () => {
    try {
      const response = await Axios.get('/level/getAll');
      setLevels(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: '/',
        data: {
          ...search,
        },
      });
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    ActivitiesDataRequest();
    CategoriesDataRequest();
    LevelsDataRequest();
  }, []);

  return (
    <div className='desktop'>
      <div className='left'>
        <div className="mapComposant">
          <Map />
        </div>
      </div>
      <div className='right'>
        <div className='search'>
          <form onSubmit={handleSubmit}>
            <select name="categories">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select name="city">
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>{activity.city}</option>
              ))}
            </select>
            <select name="level">
              {levels.map((level) => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
            <button type="submit">Rechercher</button>
          </form>
        </div>
        <div className='activitiesList'>
          {activities.map((activity) => (
            <div className='activity' key={activity.id}>
              <div className='activity__image'>
                <img src="https://i.picsum.photos/id/347/200/300.jpg?hmac=1fVrW9rwreP4KjihlnGB5FbyHgQZ_B06amJlSg6bfes" alt="" />
              </div>
              <div className='activity__title'>
                <h2>{activity.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Desktop;
