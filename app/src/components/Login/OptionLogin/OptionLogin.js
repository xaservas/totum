import React from 'react';
import PropTypes from 'prop-types';

import './optionLogin.scss';

function OptionLogin() {
  const [cookieValue, setCookieValue] = React.useState('');
  const [landmarkValue, setLandmarkValue] = React.useState('');

  const landmarkClick = () => {
    const newValue = !landmarkValue;
    setLandmarkValue(newValue);
  };

  const cookieClick = () => {
    const newValueB = !cookieValue;
    setCookieValue(newValueB);
  };

  return (
    <div className='OptionLogin'>
      <label className='checkbox'>
        <input name='landmark' type='checkbox' onClick={landmarkClick} />
        <span className='slider round'></span>
        <p>Géolocalisation</p>
      </label>
      <label className='checkbox'>
        <input name='cookie' type='checkbox' onClick={cookieClick} />
        <span className='slider round'></span>
        <p>Cookies</p>
      </label>
    </div>
  );
}

OptionLogin.propTypes = {
  newValue: PropTypes.bool.isRequired,
  newValueB: PropTypes.bool.isRequired,
};

export default OptionLogin;
