import React from 'react';
import PropTypes from 'prop-types';
import './listActivities.scss';

function ListActivities({...rest}){
   return (
       <article
           className={'listActivities panel'}
           {...rest}
       >
            <p className='activities-title panel-heading'>Activités prévues</p>
        <ul className='activities'>
            <li className='activity panel-block'>
                <div className='column activity-name'>Escalade</div>
                <div className='column activity-date'>le 11/06/2022</div>    
                <div className='column activity-status'>Accepted</div>
            </li> 
            <li className='activity panel-block'>
                <div className='column activity-name'>Foot</div>
                <div className='column activity-date'>le 12/06/2022</div>    
                <div className='column activity-status'>En attente</div>
            </li> 
        </ul>   
       </article>
   );
};

ListActivities.propTypes = {
    className: PropTypes.string,
};
ListActivities.defaultProps = {
    className: '',
};
export default ListActivities;
