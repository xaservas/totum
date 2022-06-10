import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';

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
            <div className='activities-current panel'>
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
            </div>
            <div className='activities-current panel'>
                <p className='activities-title panel-heading'>Activités passées</p>
                <ul className='activities'>
                    <li className='activity panel-block'>
                        <div className='column activity-name'>Jokari</div>
                        <div className='column activity-date'>le 11/06/2021</div>    
                        <div className='column activity-status'>Accepted</div>
                    </li> 
                    <li className='activity panel-block'>
                        <div className='column activity-name'>Bridge</div>
                        <div className='column activity-date'>le 12/11/2021</div>    
                        <div className='column activity-status'>En attente</div>
                    </li> 
                    <li className='activity panel-block'>
                        <div className='column activity-name'>Macramé</div>
                        <div className='column activity-date'>le 12/11/2021</div>    
                        <div className='column activity-status'>En attente</div>
                    </li> 
                </ul>
            </div>
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
