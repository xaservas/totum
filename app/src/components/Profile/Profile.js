import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';
import ListActivities from '../ListActivities/ListActivities';

function Profile({...rest}){
   return (
       <section
           className={'profile card'}
           {...rest}
       >
        <div className='card-content'>
            <div className='media'>
                <div className='media-left'>
                    <figure className='avatar image is-128x128'>
                        <img 
                        className='is-rounded' 
                        src='https://dodoodad.com/wp-content/uploads/2021/01/Untitled-2-57.jpg'
                        alt='profile'/>
                    </figure>
                </div>  
                <div className='media-content'>
                <p className='profile-name title is-4'>John Doe</p>
                <p className='profile-presentation content'> Bâtard de torvisse de colon de cossin de gériboire de cochonnerie de christie de saint-sacrament de Jésus Marie Joseph.</p>
                </div>            
            </div>   
       </div>
        

        <div className='profile-activities'>
            <ListActivities/>
          
            <ListActivities/>
            
        </div>

         

           
       </section>
   );
};

Profile.propTypes = {
    className: PropTypes.string,
};
Profile.defaultProps = {
    className: '',
};
export default Profile;
