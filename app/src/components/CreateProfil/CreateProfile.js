/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import { useState } from 'react';
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

  // controle password
  const validatePassword = (e) => {
    if (
      validator.isStrongPassword(e, {
        minLength: 1,
        maxLength: 30,
        hasLowercase: true,
        hasUppercase: true,
        hasNumber: true,
        hasSpecialCharacter: false,
      })
    ) {
      setPassword(e);
      setErrorMessagePassword('Mot de passe fort');
    } else {
      setErrorMessagePassword('Mot de passe trop faible');
    }
  };

  // gestion des erreurs--------------
  const errorMessage = (data) => {
    switch (data) {
      case 401:
        setError('Les mots de passe de sont pas identique');
        break;
      case 400:
        setError('Erreur inconnue');
        break;
      default:
        setError('');
        break;
    }
  };

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
        funct.closeAllModal();
      })
      .catch((err) => {
        // ajouter un message d'information si sa marche pas
        errorMessage(err.response.status);
      });
    event.preventDefault();
  };

  return (
    <div className='createProfil'>
      <FontAwesomeIcon
        icon={regular('circle-xmark')}
        onClick={() => funct.closeAllModal()}
        className='login-close'
      />
      <form onSubmit={handleSubmit} className='formProfil'>
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
            {errorMessagePassword === '' ? null : (
              <span
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>
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
            {/* <PasswordChecklist
              rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
              minLength={8}
              value={password}
              valueAgain={passwordConfirmation}
              onChange={(isValid) => {}}
            /> */}
          </div>
        </div>
        <div className='field'>
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
        <p className='errorMessage'>{error}</p>
        <button className='validation-button'> Valider </button>
      </form>
    </div>
  );
}

export default CreateProfile;
