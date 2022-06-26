/* eslint-disable indent */
import { useState } from 'react';
import axios from '../../../utils/axiosPool';
import './loginForm.scss';

function LoginForm({ funct }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState(false);

  const handleMode = (e) => {
    e.preventDefault();
    setFormMode(!formMode);
  };

  const viewRestore = formMode ? 'showRestoreForm' : '';
  const viewLogin = formMode ? 'isHidden' : '';

  const errorMessage = (data, mode) => {
    if (mode === 'login') {
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
    }

    if (mode === 'restore') {
      switch (data) {
        case 400:
          setError('Erreur inconnue');
          break;
        case 409:
          setError('Email déjà utilisé');
          break;
        default:
          setError('');
          break;
      }
    }
  };

  // save object user in localStorage
  const saveUser = (data) => {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
  };

  const handleSubmitLogin = async (event) => {
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
        errorMessage(err.response.status, 'login');
      });
  };

  const handleSubmitRestore = async (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: '/user/resetPassword',
      data: {
        email: `${email}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        // errorMessage(err.response.status, 'restore');
      });
  };

  return (
    <div>
      {/* formulaire de login */}
      <form onSubmit={handleSubmitLogin} className={`${viewLogin} LoginForm`}>
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
        <button className='button'>Connexion</button>
        <button className='button restorePassword' onClick={handleMode}>
          Mot de passe oublié ?
        </button>
      </form>

      {/* formulaire recuperation mot de passe */}
      <form
        onSubmit={handleSubmitRestore}
        className={`${viewRestore} restoreForm`}>
        <p className='errorMessage'>{error}</p>

        <input
          name='email'
          type='email'
          className='input'
          placeholder='Mail'
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className='button'>Envoyer</button>
        <button className='button restorePassword' onClick={handleMode}>
          Retour
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
