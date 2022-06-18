import React, { useEffect } from 'react';
import './login.scss';
import LoginForm from './LoginForm/LoginForm';

function Login() {
  const [geoloc, setGeoloc] = React.useState('/activities');
  const [coordinate, setCoordinate] = React.useState([]);

  useEffect(() => {
    // ajust redirection to map or activities list
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoloc('/map');
        setCoordinate([
          (coordinate[0] = position.coords.latitude),
          (coordinate[1] = position.coords.longitude),
        ]);
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
      });
    }
  }, []);

  return (
    <div className='login'>
      <a href='/createProfil'>Pas encore inscrit ?</a>
      <LoginForm />
      <a href={geoloc}>Découvrir l'application</a>
    </div>
  );
}

export default Login;
