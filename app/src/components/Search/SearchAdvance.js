import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';
import './search.scss';

function SearchSimple() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [search, setSearch] = useState({
    categories: 'all',
    level: 'all',
    city: 'all',
  });
  const [result, setResult] = useState([]);

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

  const LevelsDataRequest = async () => {
    try {
      const response = await Axios.get('/level/getAll');
      setLevels(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        method: 'post',
        url: '/activities/advancedSearch',
        data: {
          ...search,
        },
      });
      setResult(response.data);
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
    <form onSubmit={handleSubmit}>
      <div className='selector'>
        <label htmlFor='categories'>Categories</label>
        <select name='categories' onChange={handleChange}>
          <option value='all'>Tous</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='selector'>
        <label htmlFor='city'>Ville</label>
        <select name='city' onChange={handleChange}>
          <option value='all'>Tous</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.city}>
              {activity.city}
            </option>
          ))}
        </select>
      </div>
      <div className='selector'>
        <label htmlFor='level'>Niveau</label>
        <select name='level' onChange={handleChange}>
          <option value='all'>Tous</option>
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Rechercher</button>
    </form>
  );
}

export default SearchSimple;
