import { useState, useEffect } from 'react';
import './login.scss';
import LoginForm from './LoginForm/LoginForm';

function Login({ funct }) {
  // const [geoloc, setGeoloc] = useState('/activities');
  const [coordinate, setCoordinate] = useState([]);

  useEffect(() => {
    // ajust redirection to map or activities list
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setGeoloc('/map');
        setCoordinate([
          (coordinate[0] = position.coords.latitude),
          (coordinate[1] = position.coords.longitude),
        ]);
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
      });
    }
  });

  return (
    <div className='login'>
      <a onClick={() => funct.handleCreateProfile()}>Pas encore inscrit ?</a>
      <LoginForm funct={funct} />
      <a onClick={() => funct.closeAllModal()}>Découvrir l'application</a>
    </div>
  );
}

export default Login;
