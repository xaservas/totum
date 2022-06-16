import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus  } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'




function Footer({...rest}){
    let navigate = useNavigate();

    const onClick = async (event) => {
        event.preventDefault();
        navigate("/activity/create", { replace: true });
    }


   return (
    <div className='iconbar'>
       
       {/* <FontAwesomeIcon icon="fa-regular fa-circle-plus" /> */}
       <button className='icon_create' onClick={onClick}>
            <FontAwesomeIcon icon={ faCirclePlus } className='navbar-item icon is-large' />
       </button>
       
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
