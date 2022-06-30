import { useState, useEffect } from 'react';
import './login.scss';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from './LoginForm/LoginForm';

function Login({ funct }) {
  const [coordinate, setCoordinate] = useState([]);
  const [checkMap, setCheckMap] = useState(false);

  const handleMap = () => {
    setCheckMap(!checkMap);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinate([
          (coordinate[0] = position.coords.latitude),
          (coordinate[1] = position.coords.longitude),
        ]);
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
      });
      handleMap();
    } else {
      setCoordinate([(coordinate[0] = 48.856614), (coordinate[1] = 2.3522219)]);
      localStorage.setItem('coordinate', JSON.stringify(coordinate));
    }
  }, [checkMap]);

  return (
    <div className='login'>
      <div className='header-login'>
        <div></div>
        <a onClick={() => funct.handleCreateProfile()}> Pas encore inscrit ?</a>
        <FontAwesomeIcon
          icon={regular('circle-xmark')}
          onClick={() => funct.closeAllModal()}
          className='login-close'
        />
      </div>
      <LoginForm funct={funct} />
      <a className='discover' onClick={() => funct.closeAllModal()}>
        Découvrir l'application
      </a>
    </div>
  );
}

export default Login;
