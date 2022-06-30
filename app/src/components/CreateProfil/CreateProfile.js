/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import validator from 'validator';
// import PasswordChecklist from 'react-password-checklist';
import './createProfile.scss';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../utils/axiosPool';
import mapbox from '../../utils/mapbox';

function CreateProfile({ funct }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [about, setAbout] = useState('');
  const [coordinate, setCoordinate] = useState([]);
  const [cookieValue, setCookieValue] = useState(false);
  const [landmarkValue, setLandmarkValue] = useState(false);

  const [autocompleteAddress, setAutocompleteAddress] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');
  const [error, setError] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  // const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [cPasswordClass, setCPasswordClass] = useState('form-control');
  // const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

  // gestion des erreurs--------------
  const errorMessage = (data) => {
    switch (data) {
      case 401:
        setError('Les mots de passe de sont pas identique');
        break;
      case 200:
        setError('Votre compte a bien été créé');
        break;
      default:
        setError('');
        break;
    }
  };

  // controle password
  const checkPasswordMatch = () => {
    if (password !== passwordConfirmation) {
      return (
        <span
          className='text-danger'
          style={{
            color: 'red',
          }}>
          Les mots de passe de sont pas identique
        </span>
      );
    }
    return (
      <span
        className='text-success'
        style={{
          color: 'green',
        }}>
        Les mots de passe sont identique
      </span>
    );
  };

  const validatePassword = (e) => {
    if (
      validator.isStrongPassword(e, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
      })
    ) {
      setPassword(e);
      setErrorMessagePassword('Mot de passe fort');
    } else {
      setErrorMessagePassword('Mot de passe trop faible');
    }
  };

  const passwordPattern = () => {
    const pattern = /[a-zA-Z0-9]{8,}/;
    if (pattern.test(password)) {
      return true;
    }
    setErrorMessagePassword('Les caractères spéciaux ne sont pas autorisés');
    setPassword('');
    return false;
  };

  useEffect(() => {
    passwordPattern();
  }, [password]);

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);
    if (!address) return;

    const res = await mapbox(address);
    !autocompleteAddress.includes(e.target.value) &&
      res.features &&
      setAutocompleteAddress(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('');
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLandmarkValue(true);
      setCoordinate([
        (coordinate[0] = position.coords.latitude),
        (coordinate[1] = position.coords.longitude),
      ]);
    });
  }

  const splitAdress = () => {
    const countryType = document.getElementById('country');
    const zipcodeType = document.getElementById('zipCode');
    const cityType = document.getElementById('city');
    const addressType = document.getElementById('address');

    const fullAddress = address.split(',');

    const testPays = fullAddress[2];
    countryType.value = testPays;
    setCountry(testPays);

    const vildep = fullAddress[1].split(' ');

    const testZipcode = vildep[1];
    zipcodeType.value = testZipcode;
    setZipcode(testZipcode);

    const testCity = vildep[2];
    cityType.value = testCity;
    setCity(testCity);

    const testAddress = fullAddress[0];
    addressType.value = testAddress;
    setAddress(testAddress);
  };

  const cookieClick = () => {
    const newValueB = !cookieValue;
    setCookieValue(newValueB);
  };

  const handleSubmit = (event) => {
    axios({
      method: 'post',
      url: '/user/createNew',
      data: {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        password: `${password}`,
        passwordConfirmation: `${passwordConfirmation}`,
        address: `${address}`,
        zip_code: `${zipCode}`,
        city: `${city}`,
        country: `${country}`,
        about: `${about}`,
        coordinate: JSON.stringify(coordinate),
        cookie: `${cookieValue}`,
        landmark: `${landmarkValue}`,
      },
    })
      .then(() => {
        errorMessage(200);
        setTimeout(() => {
          funct.closeAllModal();
        }, 2500);
      })
      .catch((err) => {
        throw new Error(err);
      });
    event.preventDefault();
  };

  return (
    <div className='createProfil'>
      <FontAwesomeIcon
        icon={regular('circle-xmark')}
        onClick={() => funct.closeAllModal()}
        className='profil-close'
      />
      <form onSubmit={handleSubmit} className='formProfil'>
        {error === 'Votre compte a bien été créé' ? (
          <span
            style={{
              color: 'green',
            }}
            className='text-succes'>
            {error}
          </span>
        ) : (
          <span
            style={{
              color: 'red',
            }}
            className='text-danger'>
            {error}
          </span>
        )}
        <div className='nomfusion'>
          <div className='field'>
            <label className='label'>Prénom</label>
            <input
              required
              name='firstname'
              type='text'
              className='input'
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className='field'>
            <label className='label'>Nom</label>
            <input
              required
              name='lastname'
              type='text'
              className='input'
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Email</label>
          <input
            required
            name='email'
            type='email'
            className='input'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='passwordfusion'>
          <div className='field'>
            <label className='label'>Mot de passe</label>
            <input
              required
              name='password'
              type='password'
              className='input'
              onChange={(e) => validatePassword(e.target.value)}
            />
            {errorMessagePassword === 'Mot de passe fort' ? (
              <span
                style={{
                  color: 'green',
                }}
                className='validation-message'>
                {errorMessagePassword}
              </span>
            ) : (
              <span
                style={{
                  color: 'red',
                }}
                className='error-message'>
                {errorMessagePassword}
              </span>
            )}
          </div>
          <div className='field'>
            <label className='label'>Confirmation de mot de passe</label>
            <input
              required
              name='passwordConfirmation'
              type='password'
              className='input'
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {checkPasswordMatch()}
          </div>
        </div>
        <div className='field' id='searchAddress2'>
          <label className='label'>Recherche d'adresse</label>
          <input
            list='places2'
            name='searchAddress'
            type='text'
            className='input'
            onChange={handleAddressChange}
            pattern={autocompleteAddress.join('|')}
            autoComplete='off'
            onBlur={splitAdress}
          />
        </div>
        <datalist id='places2'>
          {autocompleteAddress.map((addresses, i) => (
            <option key={i}>{addresses}</option>
          ))}
        </datalist>
        {autocompleteErr && (
          <span className='inputError'>{autocompleteErr}</span>
        )}
        <div className='field'>
          <label className='label'>Numéro + Rue</label>
          <input
            required
            id='address'
            name='address'
            type='text'
            className='input'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className='zipCity'>
          <div className='field'>
            <label className='label'>Code Postal</label>
            <input
              required
              id='zipCode'
              name='zipCode'
              type='text'
              className='input'
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className='field'>
            <label className='label'>Ville</label>
            <input
              required
              id='city'
              name='city'
              type='text'
              className='input'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Pays</label>
          <input
            required
            id='country'
            name='country'
            type='text'
            className='input'
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className='field'>
          <label className='label'>Présentation</label>
          <input
            name='about'
            type='text'
            className='input'
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className='OptionLogin'>
          <label className='checkbox'>
            <input name='cookie' type='checkbox' onClick={cookieClick} />{' '}
            <span className='slider round'> </span> <p> cookies </p>{' '}
          </label>
        </div>
        <button className='validation-button'> Valider </button>
      </form>
    </div>
  );
}

export default CreateProfile;
