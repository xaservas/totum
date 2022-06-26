import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState, useEffect } from 'react';
import Axios from '../../../utils/axiosPool';

// base page
import './help.scss';

function Help({ funct }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    try {
      Axios({
        method: 'POST',
        url: '/user/sendMail',
        data: {
          email,
          message,
          token,
        },
      });
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
    funct.closeAllModal();
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
      <div>
        <h1>Aide</h1>
        <h2>Nous contacter</h2>
        <input
          required
          name='email'
          type='email'
          value={email}
          className='input'
          placeholder='Mail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name='message'
          type='text'
          value={message}
          className='textarea'
          placeholder='Message'
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='button' onClick={sendMail}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Help;
