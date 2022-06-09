import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

function Header({...rest}){
   return (
       <header>           
           <p>header</p>
        </header>
   );
};

Header.propTypes = {
    className: PropTypes.string,
};
Header.defaultProps = {
    className: '',
};
export default Header;
