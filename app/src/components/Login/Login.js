import { useState, useEffect } from 'react';
import './login.scss';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from './LoginForm/LoginForm';

function Login({ props, funct }) {
  const [coordinate, setCoordinate] = useState([]);
  const [login, setLogin] = useState();

  useEffect(() => {
    funct.setMainCoordinate(coordinate);
  }, [props.isLogged]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [props.user]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setCoordinate([
          (coordinate[0] = position.coords.latitude),
          (coordinate[1] = position.coords.longitude),
        ]);
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          if (!login) {
            setCoordinate([
              (coordinate[0] = 48.856614),
              (coordinate[1] = 2.3522219),
            ]);
            localStorage.setItem('coordinate', JSON.stringify(coordinate));
          }
        }
      },
    );
  }, []);

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
