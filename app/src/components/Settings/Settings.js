/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import './settings.scss';
import axios from '../../utils/axiosPool';
import mapbox from '../../utils/mapbox';

function Settings({ funct }) {
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
    !autocompleteAddress.includes(e.target.value)
      && res.features
      && setAutocompleteAddress(res.features.map((place) => place.place_name));
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
    const countryType = document.getElementById('country2');
    const zipcodeType = document.getElementById('zipCode2');
    const cityType = document.getElementById('city2');
    const addressType = document.getElementById('address2');

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
    document.getElementById('emailForm'.onSubmit());
    document.getElementById('passwordForm'.onSubmit());
    document.getElementById('infoForm'.onSubmit());
    axios({
      method: 'patch',
      url: '/user/{id}/manage',
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
    <div className="changeProfile">

      <form id="emailForm">
        <input
          required
          id='email'
          name='email'
          type='email'
          className='input'
          placeholder='Mail'
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <form id="passwordForm" className='password'>

        <input
          required
          name='password'
          type='password'
          className='input'
          placeholder='Mot de passe'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          name='passwordConfirmation'
          type='password'
          className='input'
          placeholder='Confirmation de Mot de passe'
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

      </form>
      <form id="infoForm" >
        <p className='errorMessage'>{error}</p>
        <input
          required
          name='firstname'
          type='text'
          className='input'
          placeholder='Prénom'
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          required
          name='lastname'
          type='text'
          className='input'
          placeholder='Nom'
          onChange={(e) => setLastname(e.target.value)}
        />

        <input
          id='searchAddress2'
          list='places'
          name='searchAddress'
          type='text'
          className='input'
          placeholder='searchAddress'
          onChange={handleAddressChange}
          pattern={autocompleteAddress.join('|')}
          autoComplete='off'
          onBlur={splitAdress}
        />
        <input
          required
          id='address2'
          name='address'
          type='text'
          className='input'
          placeholder='Adresse'
          onChange={(e) => setAddress(e.target.value)}
        />
        <datalist id='places'>
          {autocompleteAddress.map((addresses, i) => (
            <option key={i}>{addresses}</option>
          ))}
        </datalist>
        {autocompleteErr && <span className='inputError'>{autocompleteErr}</span>}
        <div className='zipCity2'>
          <input
            required
            id='zipCode2'
            name='zipCode'
            type='text'
            className='input'
            placeholder='Code Postal'
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            required
            id='city2'
            name='city'
            type='text'
            className='input'
            placeholder='Ville'
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <input
          required
          id='country2'
          name='country'
          type='text'
          className='input'
          placeholder='Pays'
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          name='about'
          type='text'
          className='input'
          placeholder='Présentation'
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className='OptionLogin'>
          <label className='checkbox'>
            <input name='cookie' type='checkbox' onClick={cookieClick} />{' '}
            <span className='slider round'> </span> <p> cookies </p>{' '}
          </label>
          <label className='checkbox'>
            <input name='notification' type='checkbox' />
            <span className='slider round'> </span> <p> Notification </p>
          </label>

          <label className='checkbox'>
            <input name='email' type='checkbox' />
            <span className='slider round'> </span> <p> E-mails </p>
          </label>

          <label className='checkbox'>
            <input name='sms' type='checkbox' />
            <span className='slider round'> </span> <p> SMS </p>
          </label>
        </div>
        <button className='button' onSubmit={handleSubmit}> Valider </button>
      </form>

    </div>
  );
}

export default Settings;
