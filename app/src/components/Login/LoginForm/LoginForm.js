import React, { useEffect } from 'react';
import './loginForm.scss';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosPool';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {}, []);

  // save object user in localStorage
  const saveUser = (data) => {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
  };

  const handleSubmit = async (event) => {
    axios({
      method: 'post',
      url: '/user/login',
      data: {
        email: `${email}`,
        password: `${password}`,
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        saveUser(response.data.user);
        navigate('/map', { replace: true });
      })
      .catch((error) => {
        // gerer l'erreur de login de maniere cosmetique
        alert('tu tes tromper connard');
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='LoginForm'>
        <input
          name='email'
          type='email'
          className='input'
          placeholder='Mail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name='password'
          type='password'
          className='input'
          placeholder='Mot de passe'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button'>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
