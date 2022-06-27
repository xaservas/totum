import ReactDOM from 'react-dom/client';
import './index.scss';
// import 'bulma/css/bulma.min.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleReCaptchaProvider
    language='fr'
    reCaptchaKey='6LeeCZ0gAAAAAHk6N5QVHqr_lI7XpUOc98pSQnTG'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </GoogleReCaptchaProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
