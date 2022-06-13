import React from 'react';
import PropTypes from 'prop-types';
import './activity.scss';
import { useParams } from 'react-router-dom'
import { findActivityById, findActivityByName } from '../../utils/dataTools';
/**Xavier/10/06/2022:
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
function Activity({
    activities,
    ...rest}) {
        //console.log(activities)
        const { id } = useParams();
        console.log(id);

        const currentActivity = findActivityById(activities, id);
        console.log(currentActivity);

   return (
       <article
           className={'activity card'}
           {...rest}
       >
           <header className='card-header'>
                <p className='activity__name card-header-title'>{currentActivity.name}</p>
                <figure className='image is-24x24'>
                    <img className='activity__owner is-rounded' 
                            src={currentActivity.owner_picture}
                            alt={currentActivity.owner}/>
                </figure>
                <p className='activity-level'>{currentActivity.level}</p>
                <button className="modal-close is-large" aria-label="close"></button>
           </header>
           <body className='card-content'>
                <progress className="activity__takeholders progress" value="15" max="100">15%</progress>
                <p className='activity__adress'>{currentActivity.address}, {currentActivity.city}, {currentActivity.zip_code}, {currentActivity.country}</p>
                <p className='activity__description'>{currentActivity.description}</p>
           </body>
           <footer className='card-footer'>
             <a href="/" className="card-footer-item">Participer</a>
           </footer>
       </article>
   );
};

Activity.propTypes = {
    className: PropTypes.string,
    activity: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string.isRequired,
        level: PropTypes.string,
        address: PropTypes.string.isRequired,
        zip_code: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }).isRequired
};
Activity.defaultProps = {
    className: '',
    descritpion: 'activité sans description',
    level: 'activité sans niveau',
};
export default Activity;

