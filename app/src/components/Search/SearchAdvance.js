/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';
import './search.scss';

function SearchSimple({ funct, props }) {
  // const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [search, setSearch] = useState({
    id_category: 'all',
    level: 'all',
    city: 'all',
  });
  const [cities, setCities] = useState([]);
  const [synchroListActivities, setSynchroListActivities] = useState(false);

  const checkSynchro = () => {
    setSynchroListActivities(!synchroListActivities);
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const ActivitiesDataRequest = async () => {
    const temp = [];
    try {
      const response = await Axios.get('/activities');
      // setActivities(response.data);
      response.data.map((item) => {
        if (item.city !== null) {
          if (temp.includes(capitalize(item.city))) {
            return;
          }
          temp.push(capitalize(item.city));
        }
      });
      temp.sort();
      setCities(temp);
    } catch (error) {
      throw new Error(error);
    }
  };

  const CategoriesDataRequest = async () => {
    try {
      const response = await Axios.get('/category/categories');
      response.data.sort((a, b) => {
        const aName = a.name;
        const bName = b.name;
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
        return 0;
      });
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

  const handleSubmit = async () => {
    try {
      const response = await Axios({
        method: 'post',
        url: '/activities/advancedSearch',
        data: {
          ...search,
        },
      });
      funct.handleActivitiesList(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        funct.handleActivitiesList([
          {
            id: 404,
            name: "Désolé il n'y à pas d'activités pour le moment",
          },
        ]);
      }
      throw new Error(error);
    }
  };

  useEffect(() => {
    ActivitiesDataRequest();
    CategoriesDataRequest();
    LevelsDataRequest();
  }, [props.addActivity, synchroListActivities]);

  useEffect(() => {
    handleSubmit();
  }, [search]);

  useEffect(() => {
    checkSynchro();
  }, [props.listMparameters]);

  return (
    <form className='advanceSearch'>
      <div className='selector'>
        <select name='id_category' onChange={handleChange}>
          <option value='all'>Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='selector'>
        <select name='city' onChange={handleChange}>
          <option value='all'>Ville</option>
          {cities.map((city) => (
            <option key={city} value={city.toLowerCase()}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className='selector'>
        <select name='level' onChange={handleChange}>
          <option value='all'>Niveau</option>
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default SearchSimple;
