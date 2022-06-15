import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegular, faCirclePlus  } from '@fortawesome/free-solid-svg-icons'



function Footer({...rest}){
   return (
    <div className='iconbar'>
       
       <FontAwesomeIcon icon="fa-regular fa-circle-plus" />
       <div className='icon'>
            <FontAwesomeIcon icon={ faCirclePlus } className='navbar-item icon is-large' />
       </div>
       
    </div>
     );
};

Footer.propTypes = {
    className: PropTypes.string,
};
Footer.defaultProps = {
    className: '',
};
export default Footer;
