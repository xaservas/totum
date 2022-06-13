import React from 'react';
import PropTypes from 'prop-types';
import './listActivities.scss';

function ListActivities({
    list_type,
    activities, 
    ...rest}){
   return (
       <article
           className={'listActivities panel'}
           {...rest}
       >
            <p className='activities-title panel-heading'>{list_type}</p>
            <ul className='activities'>

                    {activities.map(activity => (
                    <li key='activity.id' 
                        className='activity panel-block'>
                            <div className='column activity-name'>{activity.name}</div>
                            <div className='column activity-date'>{activity.date}</div>    
                            <div className='column activity-status'>{activity.tag}</div>
                    </li>
                    ))}
                    
                    {/*
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
                    */}
            </ul>
       </article>
   );
};

ListActivities.propTypes = {
    className: PropTypes.string,
    list_type: PropTypes.string,
    activities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};
        
ListActivities.defaultProps = {
    className: '',
    list_type: 'Toutes les activités'
};
export default ListActivities;
