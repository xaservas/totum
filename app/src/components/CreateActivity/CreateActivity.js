import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './createActivity.scss';
import Calendar from 'react-calendar';
import axios from '../../utils/axiosPool';
import 'react-calendar/dist/Calendar.css';

function CreateActivity({ props, funct }) {
  const userId = localStorage.getItem('id');
  const [categories, setCategories] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [activity, setActivity] = React.useState({
    name: '', // name n'apparait pas dans la requete
    description: '',
    max_participants: 1,
    date: '',
    level: 1,
    address: '',
    zip_code: '',
    city: '',
    country: '',
    id_user: userId,
    id_category: 3,
    // affichage de toute la liste
    // utiliser find pour améliorer la sélection
  });
  const [date, setDate] = React.useState(new Date());

  const sortObjectsByProp = (objectsArr, prop, ascending = true) => {
    const objectsHaveProp = objectsArr.every((object) =>

      object.hasOwnProperty(prop)

    );
    if (objectsHaveProp) {
      const newObjectsArr = objectsArr.slice();
      newObjectsArr.sort((a, b) => {
        if (Number.isNaN(Number(a[prop]))) {
          const textA = a[prop].toUpperCase();
          const textB = b[prop].toUpperCase();
          if (ascending) {
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          }
          return textB < textA ? -1 : textB > textA ? 1 : 0;
        }
        return ascending ? a[prop] - b[prop] : b[prop] - a[prop];
      });
      return newObjectsArr;
    }
    return objectsArr;
  };

  const getCategories = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/category/categories',
      });
      const sortedCategories = sortObjectsByProp(response.data, 'name');
      setCategories(sortedCategories);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getLevels = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/level/getAll',
      });
      // console.log(response.data);
      setLevels(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((previousActivity) => ({
      ...previousActivity,
      [name]: value,
    }));
  };

  const handleDateChannge = (e) => {
    const newDate = e.target.value;
    console.log(newDate);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: '/activity/createNew',
        data: {
          ...activity,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }

    // console.log(activity)
  };
  /*
    const categoriesNames = (myCategories) => {
        myCategories.forEach(category => {
            console.log (category.name);
        })
    }
*/

  useEffect(() => {
    getCategories();
    getLevels();
  }, []);

  return (
    <form
      className='createActivity'
      onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Activité</label>
        <input
          className='input'
          type='text'
          placeholder='intitulé'
          name='name'
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label className='label'>Participants</label>
        <input
          className='input width-30'
          type='text'
          placeholder='nombre max de participants'
          name='max_participants'
          value={activity.max_participants}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label className='label'>Catégorie</label>
        <div className='select-style'>
          <select
            className='select'
            type='text'
            placeholder='intitulé'
            name='id_category'
            value={activity.id_category}
            onChange={handleChange}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='field'>
        <label className='label'>Niveau</label>
        <div className='select-style'>
          <select
            className='select'
            type='text'
            name='level'
            value={activity.level}
            onChange={handleChange}>
            {levels.map((level) => (
              <option value={level.id} key={level.id}>
                {level.name}
              </option>
            ))}
          </select>

        </div>
      </div>
      <div className='field description'>
        <label className='label'>Description</label>
        <div className='control'>
          <textarea
            className='textarea'
            type='text'
            name='description'
            placeholder='description'
            value={activity.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Adresse</label>
        <input
          className='input'
          type='text'
          placeholder='addresse'
          name='address'
          value={activity.address}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label className='label'>Ville</label>
        <input
          className='input'
          type='text'
          placeholder='ville'
          name='city'
          value={activity.city}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label className='label'>Code Postal</label>
        <input
          className='input'
          type='text'
          placeholder='code postal'
          name='zip_code'
          value={activity.zip_code}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label className='label'>Pays</label>
        <input
          className='input'
          type='text'
          placeholder='pays'
          name='country'
          value={activity.country}
          onChange={handleChange}
        />
      </div>
      <div className='field date'>
        <label className='label'>Date</label>
        {/* Find a calendar module */}
        <div className='control'>
          <Calendar
            className='calendar'
            name='date'
            value={date}
            onChange={handleDateChannge}
          />
        </div>
      </div>
      <div className='validation-button'>
        {/* redirect to the activity page */}
        <span className='button' type='submit'>
          Submit
        </span>

        {/* redirect to root */}
        <span className='button is-light' type='reset'>
          Cancel
        </span>
      </div>
    </form>
  );
}

CreateActivity.propTypes = {
  className: PropTypes.string,
};
CreateActivity.defaultProps = {
  className: '',
};
export default CreateActivity;
