/* eslint-disable indent */
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState, useEffect } from 'react';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from '../../../utils/axiosPool';

// base page
import './help.scss';

function Help({ funct }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const checkStatus = (response) => {
    switch (response) {
      case 200:
        setError('Votre message a bien été envoyé');
        break;
      case 401:
        setError("Votre message n'a pas été envoyé");
        break;
      default:
        setError('Une erreur est survenue');
        break;
    }
  };

  const submit = async () => {
    try {
      const postMail = await Axios({
        method: 'POST',
        url: '/user/sendMail',
        data: {
          email,
          message,
          token,
        },
      });
      checkStatus(postMail.status);
      setTimeout(() => {
        funct.closeAllModal();
        setError('');
        setEmail('');
        setMessage('');
      }, 2000);
    } catch (err) {
      throw new Error(err);
    }
  };

  const sendMail = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const result = await executeRecaptcha('contact');
    setToken(result);
    submit();
  };

  useEffect(() => {
    if (!executeRecaptcha) {
      return;
    }
    const handleReCaptchaVerify = async () => {
      const token2 = await executeRecaptcha('contact');
      setToken(token2);
    };
    handleReCaptchaVerify();
  }, [executeRecaptcha]);

  return (
    <div className='help'>
      <FontAwesomeIcon
        icon={regular('circle-xmark')}
        onClick={() => funct.closeAllModal()}
        className='profil-close'
      />
      <div className='help-div'>
        <h1>Nous contacter</h1>
        <p>{error}</p>
        <div className='field'>
          <label className='label-email'>Email</label>
          <input
            required
            name='email'
            type='email'
            value={email}
            className='email-field'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='field'>
          <label className='label'>Vos questions</label>
          <textarea
            name='message'
            type='text'
            value={message}
            className='textarea'
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className='validation-button' onClick={sendMail}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Help;
