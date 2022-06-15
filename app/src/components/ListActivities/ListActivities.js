import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './listActivities.scss';
import axios from '../../utils/axiosPool';

function ListActivities({
    list_type,
    /*activities, */
    ...rest}){
        const [activities, setActivities] = useState([]);

        const ActivitiesDataRequest = async () => {
            try {
                const result= await axios({
                    method:'get',
                    url: '/activities'
                })
                console.log(result.data); 
                setActivities(result.data) ;
            } catch (error) {
                console.log(error)
            }
        };

        useEffect(() => {
            ActivitiesDataRequest()
        },[]);

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
                    
            </ul>
       </article>
   );
};

ListActivities.propTypes = {
    className: PropTypes.string,
    list_type: PropTypes.string,
    
    /*activities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
    }).isRequired).isRequired,*/
};
        
ListActivities.defaultProps = {
    className: '',
    list_type: 'Toutes les activités'
};
export default ListActivities;
