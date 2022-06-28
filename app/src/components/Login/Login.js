import { useState, useEffect } from 'react';
import './login.scss';
import LoginForm from './LoginForm/LoginForm';

function Login({ funct }) {
  const [coordinate, setCoordinate] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinate([
          (coordinate[0] = position.coords.latitude),
          (coordinate[1] = position.coords.longitude),
        ]);
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
      });
    } else {
      setCoordinate([(coordinate[0] = 48.856614), (coordinate[1] = 2.3522219)]);
      localStorage.setItem('coordinate', JSON.stringify(coordinate));
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
