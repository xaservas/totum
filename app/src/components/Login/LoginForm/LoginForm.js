import { useState } from 'react';
import axios from '../../../utils/axiosPool';
import './loginForm.scss';

function LoginForm({ funct }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const errorMessage = (data) => {
    switch (data) {
    case 401:
      setError('Email ou mot de passe incorrect');
      break;
    case 404:
      setError("L'utilisateur n'existe pas");
      break;
    case 400:
      setError('Erreur inconnue');
      break;
    default:
      setError('');
      break;
    }
  };

  // save object user in localStorage
  const saveUser = (data) => {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        funct.checkUser();
      })
      .catch((err) => {
        errorMessage(err.response.status);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='LoginForm'>
        <p className='errorMessage'>{error}</p>

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
