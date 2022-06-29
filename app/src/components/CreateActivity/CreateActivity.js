/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable default-case */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './createActivity.scss';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import axios from '../../utils/axiosPool';
import 'react-calendar/dist/Calendar.css';

function CreateActivity({ props, funct }) {
  const userId = localStorage.getItem('id');
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    max_participants: 1,
    date: '',
    level: '',
    address: '',
    zip_code: '',
    city: '',
    country: '',
    id_user: userId,
    id_category: '',

  });
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const [dateValue, setDate] = useState(new Date());
  const dateParsed = dayjs(dateValue).toISOString();

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // submit mode
  const [sendMode, setSendMode] = useState(false);

  const checkSend = () => {
    setCheck(!check);
  };

  // gestion error
  const checkError = (code) => {
    switch (code) {
      case 400:
        setError('Veuillez remplir tous les champs');
        break;
      case 500:
        setError('Une erreur est survenue');
        break;
      case 404:
        setError("Cette activité n'existe pas");
        break;
      case 200:
        if (!sendMode) {
        setError('Votre activité a bien été créée');
        } else {
          setError('Votre activité a bien été modifiée');
        }
        break;
    }
  };

  const sortObjectsByProp = (objectsArr, prop, ascending = true) => {
    const objectsHaveProp = objectsArr.every((object) => object.hasOwnProperty(prop));
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
      sortedCategories.sort((a, b) => a.id - b.id);
      setActivity({ ...activity, id_category: sortedCategories[0].id });
      setCategories(sortedCategories);
    } catch (err) {
      throw new Error(err);
    }
  };

  const getLevels = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/level/getAll',
      });
      setActivity({ ...activity, level: response.data[0].id });
      setLevels(response.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  // get activity for update
  const getActivityById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/activity/${id}/manage`,
      });
      setActivity({ ...activity, ...response.data });
      setDate(new Date(response.data.date));
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((previousActivity) => ({
      ...previousActivity,
      [name]: value,
    }));
  };

  // reset button
  const resetForm = () => {
    setActivity({
      name: '',
      description: '',
      max_participants: 1,
      date: '',
      level: '',
      address: '',
      zip_code: '',
      city: '',
      country: '',
      id_user: userId,
      id_category: '',
    });
    setDate(new Date());
    setError('');
  };

  const closeAddActivity = () => {
    funct.closeAllModal();
    setCheck(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    // create new activity
    if (!sendMode) {
      activity.city = capitalize(activity.city);
      event.preventDefault();
      try {
        const response = await axios({
          method: 'post',
          url: '/activity/createNew',
          data: {
            ...activity,
          },
        });
        setError('');
        checkError(response.status);
        setTimeout(() => {
          funct.handleCreateActivity();
          checkSend();
          resetForm();
          setDate(new Date());
          setError('');
          setCheck(false);
        }, 1500);
      } catch (err) {
        checkError(err.response.status);
        setCheck(false);
        throw new Error(err);
      }
    }

    // update activity
    else {
      activity.city = capitalize(activity.city);
      delete activity.created_at;
      delete activity.updated_at;
      activity.date = dateParsed;
      event.preventDefault();
      try {
        const response = await axios({
          method: 'patch',
          url: `/activity/${activity.id}/manage`,
          data: {
            ...activity,
          },
        });
        setError('');
        checkError(response.status);
        setTimeout(() => {
          funct.handleCreateActivity();
          checkSend();
          resetForm();
          setDate(new Date());
          setError('');
          setCheck(false);
        }, 1500);
      } catch (err) {
        checkError(err.response.status);
        setCheck(false);
        throw new Error(err);
      }
    }
  };

  useEffect(() => {
    getCategories();
    getLevels();
  }, [check]);

  useEffect(() => {
    setActivity((previousActivity) => ({
      ...previousActivity,
      date: dateParsed,
    }));
  }, [dateValue]);

  // effect update activity
  useEffect(() => {
    getActivityById(props.activityContentUpdate);
    if (props.activityContentUpdate !== 0) {
      console.log('update activity');
      setSendMode(true);
    } else {
      console.log('create new activity');
      setSendMode(false);
    }
  }, [props.activityContentUpdate]);
  return (
    <form className='createActivity' onSubmit={handleSubmit}>
      <div className='createActivity_container'>
        {error === 'Votre activité a bien été créée' || error === 'Votre activité a bien été modifiée' ? (
          <p className='sendMessage'>{error}</p>
        ) : (
          <p className='errorMessage'>{error}</p>
        )}
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
          <FontAwesomeIcon
            icon={regular('circle-xmark')}
            onClick={closeAddActivity}
            className='create-close'
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
          <div className='input'>
            <Calendar
              className='calendar'
              name='date'
              value={dateValue}
              onChange={setDate}
            />
          </div>
        </div>
        <div className='validation-button'>
          <button className='button' type='submit'>
            Submit
          </button>
          <button className='button is-light' type='reset' onClick={resetForm}>
            Cancel
          </button>
        </div>
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
