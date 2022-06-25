import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { useState } from 'react';
import Axios from '../../../utils/axiosPool';

import './help.scss';

function Help() {
  const ReComponent = () => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async () => {
      try {
        const newToken = await executeRecaptcha('contact');
        setToken(newToken);
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

    return (
      <div>
        <GoogleReCaptcha onVerify={(t) => console.log(t)} />
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
        <button className='button' onClick={handleSubmit}>
          Envoyer
        </button>
      </div>
    );
  };

  return (
    <GoogleReCaptchaProvider
      language='fr'
      reCaptchaKey='6LeeCZ0gAAAAAHk6N5QVHqr_lI7XpUOc98pSQnTG'>
      <div className='help'>
        <ReComponent />
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default Help;
