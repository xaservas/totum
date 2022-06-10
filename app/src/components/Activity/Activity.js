import React from 'react';
import PropTypes from 'prop-types';
import './activity.scss';
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
function Activity({...rest}){
   return (
       <article
           className={'activity card'}
           {...rest}
       >
           <header className='card-header'>
                <p className='activity__name card-header-title'>Escalade</p>
                <figure className='image is-24x24'>
                    <img className='activity__owner is-rounded' 
                            src='https://dodoodad.com/wp-content/uploads/2021/01/Untitled-2-57.jpg'
                            alt='activity.owner'/>
                </figure>
                <p className='activity-level'>Apéro déguisé</p>
                <button class="modal-close is-large" aria-label="close"></button>
           </header>
           <body className='card-content'>
                <progress className="activity__takeholders progress" value="15" max="100">15%</progress>
                <p className='activity__adress'>the Nose, Yosemite Park, USA</p>
                <p className='activity__description'>Verrat de saintes fesses de ciarge de torvisse d'étole d'esprit de Jésus de plâtre de bâtard de batèche de cibouleau de viande à chien de sacrament.</p>
           </body>
           <footer className='card-footer'>
             <a href="#" className="card-footer-item">Participer</a>
           </footer>
       </article>
   );
};

Activity.propTypes = {
    className: PropTypes.string,
};
Activity.defaultProps = {
    className: '',
};
export default Activity;

