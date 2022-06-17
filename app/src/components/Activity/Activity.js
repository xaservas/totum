/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './activity.scss';
import { useParams } from 'react-router-dom';
// import { findActivityById } from '../../utils/dataTools';
import axios from '../../utils/axiosPool';

/** Xavier/10/06/2022:
 *
 * this component could be a modal that could be used in lists and map
 * when it's not active it looks like a buton with contextual informations
 * for instance: if it's used in th map, the button could display a simple picto,
 * while if it's used in the homepage list it should show picto, name, date, owner and number of takeholders
 * if it's used in the profile/past activities list, it could show only name, date and owner....
 *
 * Anyway, the actual content of the modal might be more or less the same in any case.
 * I'll first develop the content.
 *
 *
 */

function Activity({ ...rest }) {
  // console.log(activities)
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  console.log(id);

  const activityRequest = async (idElem) => {
    try {
      const result = await axios({
        method: 'get',
        url: `/activity/${idElem}/manage`,
      });
      console.log(result.data);
      setActivity(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    activityRequest(id);
  }, []);

  return (
    <article className={'activity card'} {...rest}>
      <header className='card-header'>
        <p className='activity__name card-header-title'>{activity.name}</p>
        {/*<figure className='image is-48x48'>
          <img
            className='activity__owner is-rounded'
            src={activity.owner_picture}
            alt={activity.owner}
          />
        </figure>*/}
        <p className='activity-level'>{activity.level}</p>
        <button className='modal-close is-large' aria-label='close'></button>
      </header>
      <body className='card-content'>
        <progress
          className='activity__takeholders progress'
          value='15'
          max='100'>
          15%
        </progress>
        <p className='activity__adress'>
          {activity.address}, {activity.city}, {activity.zip_code},{' '}
          {activity.country}
        </p>
        <p className='activity__description'>{activity.description}</p>
      </body>
      <footer className='card-footer'>
        <a href='/' className='card-footer-item'>
          Participer
        </a>
      </footer>
    </article>
  );
}

Activity.propTypes = {
  className: PropTypes.string,
};
Activity.defaultProps = {
  className: '',
};
export default Activity;
