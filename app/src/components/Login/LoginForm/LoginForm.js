/* eslint-disable indent */
import { useState, useCallback, useEffect } from 'react';
import axios from '../../../utils/axiosPool';
import './loginForm.scss';

function LoginForm({ funct }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState(false);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');

  const storeValue = useCallback(() => {
    funct.storeToken(token);
    funct.storeUserId(userId);
  });

  useEffect(() => {
    storeValue();
  }, [storeValue, token, userId]);

  const handleMode = (e) => {
    e.preventDefault();
    setFormMode(!formMode);
    setError('');
  };

  const handleForm = () => {
    setFormMode(!formMode);
    setError('');
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
        case 200:
          setError('Email envoyé');
          break;
        case 404:
          setError("L'utilisateur n'existe pas");
          break;
        case 401:
          setError('Erreur inconnue merci de réessayer plus tard');
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
        setUserId(response.data.user.id);
        setToken(response.data.token);
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
        errorMessage(response.status, 'restore');
        setTimeout(() => {
          handleForm();
        }, 1500);
      })
      .catch((err) => {
        errorMessage(err.response.status, 'restore');
      });
  };

  return (
    <div className='container-form'>
      {/* formulaire de login */}
      <form onSubmit={handleSubmitLogin} className={`${viewLogin} LoginForm`}>
        <p className='errorMessage'>{error}</p>

        <input
          name='email'
          type='email'
          className='input-mail'
          placeholder='Votre email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name='password'
          type='password'
          className='input-password'
          placeholder='Mot de passe'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button'>Connexion</button>
        <button className='button-R restorePassword' onClick={handleMode}>
          Mot de passe oublié ?
        </button>
      </form>

      {/* formulaire recuperation mot de passe */}
      <form
        onSubmit={handleSubmitRestore}
        className={`${viewRestore} restoreForm`}>
        {error === 'Email envoyé' ? (
          <p className='sendOk'>{error}</p>
        ) : (
          <p className='errorMessage'>{error}</p>
        )}
        <input
          name='email'
          type='email'
          className='input-mail'
          placeholder='Votre email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className='button'>Envoyer</button>
        <button className='button-R restorePassword' onClick={handleMode}>
          Retour
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
