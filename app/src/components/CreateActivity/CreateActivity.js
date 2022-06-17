/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './createActivity.scss';
import axios from '../../utils/axiosPool';

function CreateActivity({ ...rest }) {
  const userId = localStorage.getItem('id');
  const [categories, setCategories] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [activity, setActivity] = React.useState({
    name: 'escalade', // name n'apparait pas dans la requete
    description: 'apéro',
    max_participants: 5,
    date: 'demain',
    level: 1,
    address: 'outuveux',
    zip_code: '93000',
    city: 'Montreuil',
    country: 'France',
    landmark: 'landmarkFake',
    id_user: userId,
    id_category: 3,
    // affichage de toute la liste
    // utiliser find pour améliorer la sélection
  });

  const sortObjectsByProp = (objectsArr, prop, ascending = true) => {
    const objectsHaveProp = objectsArr.every((object) =>
      object.hasOwnProperty(prop)
    );
    if (objectsHaveProp) {
      const newObjectsArr = objectsArr.slice();
      newObjectsArr.sort((a, b) => {
        if (isNaN(Number(a[prop]))) {
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
      console.log(error);
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
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getLevels();

    // categories.forEach(category => console.log(category.name))

    // const sortedCategories = sortObjectsByProp(categories, "name") ;
    // console.log(categories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((previousActivity) => ({
      ...previousActivity,
      [name]: value,
    }));
    // console.log(activity);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(activity);
    try {
      const response = await axios({
        method: 'post',
        url: '/activity/createNew',
        data: {
          ...activity,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
  return (
    <form className={'createActivity'} {...rest} onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Activité</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='intitulé'
            name='name'
            value={activity.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Catégorie</label>
        <div className='select'>
          <select
            className='input'
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
        <div className='select'>
          <select
            className='input'
            type='text'
            placeholder='intitulé'
            name='id_level'
            value={activity.id_level}
            onChange={handleChange}>
            {levels.map((level) => (
              <option value={level.id} key={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='field'>
        <label className='label'>Nombre maximum de participants</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='nombre max de participants'
            name='max_participants'
            value={activity.max_participants}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Adresse</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='addresse'
            name='address'
            value={activity.address}
            onChange={handleChange}
          />
        </div>

        <label className='label'>Ville</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='ville'
            name='city'
            value={activity.city}
            onChange={handleChange}
          />
        </div>

        <label className='label'>Code Postal</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='code postal'
            name='zip_code'
            value={activity.zip_code}
            onChange={handleChange}
          />
        </div>

        <label className='label'>Pays</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='pays'
            name='country'
            value={activity.country}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Date</label>
        {/* Find a calendar module */}
        <div className='control'>
          <input
            className='input'
            type='text'
            name='date'
            value={activity.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Description</label>
        <div className='control'>
          <textarea
            className='textarea'
            type='text'
            name='description'
            placeholder='Description'
            value={activity.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='field is-grouped'>
        <p className='control'>
          {/* redirect to the activity page */}
          <button className='button is-primary' type='submit'>
            Submit
          </button>
        </p>
        <p className='control'>
          {/* redirect to root */}
          <button className='button is-light'>Cancel</button>
        </p>
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
