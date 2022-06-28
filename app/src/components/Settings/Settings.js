/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import './settings.scss';
import axios from '../../utils/axiosPool';
import mapbox from '../../utils/mapbox';

function Settings({ props }) {
  // const userData = localStorage.getItem('');
  // console.log(userData);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [emailNew, setEmailNew] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [about, setAbout] = useState('');
  const [user, setUser] = useState('');
  const [cookieValue, setCookieValue] = useState(false);

  const [autocompleteAddress, setAutocompleteAddress] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');
  // const [error, setError] = useState('');
  const { userId } = props;
  // gestion des erreurs--------------
  // const errorMessage = (data) => {
  //   switch (data) {
  //   case 401:
  //     setError('Les mots de passe de sont pas identique');
  //     break;
  //   case 400:
  //     setError('Erreur inconnue');
  //     break;
  //   default:
  //     setError('');
  //     break;
  //   }
  // };

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);
    if (!address) return;

    const res = await mapbox(address);
    !autocompleteAddress.includes(e.target.value) &&
      res.features &&
      setAutocompleteAddress(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('');
  };

  //  split de l'adresse dans les différents champs

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

  const getMetaUser = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/meta/${id}/manage`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCookieValue(response.data.cookie);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/manage`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setAddress(response.data.address);
      setEmail(response.data.email);
      setZipcode(response.data.zip_code);
      setCity(response.data.city);
      setCountry(response.data.country);
      setAbout(response.data.about);
      getMetaUser(response.data.meta_id);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getUserById(JSON.parse(localStorage.getItem('id')));
  }, [props.token]);

  const handleSubmit = () => {
    if (password !== '' && passwordConfirmation !== '') {
      if (password === passwordConfirmation) {
        axios({
          method: 'patch',
          url: `/user/${userId}/manage/passwordUpdate`,
          data: {
            password: `${password}`,
            passwordConfirmation: `${passwordConfirmation}`,
          },
        })
          .then((res) => {
            console.log(res);
            // funct.closeAllModal();
          })
          .catch((err) => {
            // ajouter un message d'information si sa marche pas
            // errorMessage(err.response.status);
            console.log(err);
            console.log('erreur mot de passe');
          });
      }
      // return 'les mots de passe ne corresponds pas';
    }

    if (
      email === localStorage.getItem('email') &&
      emailNew !== '' &&
      emailConfirmation !== ''
    ) {
      if (emailNew === emailConfirmation) {
        axios({
          method: 'patch',
          url: `/user/${userId}/manage/emailUpdate`,
          data: {
            email: `${email}`,
            emailNew,
            emailConfirmation,
          },
        })
          .then((res) => {
            console.log(res);
            // funct.closeAllModal();
          })
          .catch((err) => {
            // ajouter un message d'information si sa marche pas
            // errorMessage(err.response.status);
            console.log(err);
            console.log('erreur mail');
          });
        // return 'les mails sont identiques';
      }
      // pas pareille les mails
    }
    if (user !== localStorage.getItem('user')) {
      axios({
        method: 'patch',
        url: `/user/${userId}/manage`,
        data: {
          firstname: `${firstname}`,
          lastname: `${lastname}`,
          address: `${address}`,
          zip_code: `${zipCode}`,
          city: `${city}`,
          country: `${country}`,
          about: `${about}`,
          cookie: `${cookieValue}`,
        },
      })
        .then((res) => {
          console.log(res);
          // funct.closeAllModal();
        })
        .catch((err) => {
          // ajouter un message d'information si sa marche pas
          // errorMessage(err.response.status);
          console.log(err);
          console.log('erreur data');
          // return 'les mails sont identiques';
        });
    }
    return 'error';
  };

  return (
    <div className='changeProfile'>
      <form id='emailForm'>
        <div className='field'>
          <label className='label'>Email</label>
          <input
            required
            id='email'
            name='email'
            type='email'
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='modifMail'>
          <div className='field'>
            <label className='label'>Changement d'email</label>
            <input
              required
              id='emailNew'
              name='emailNew'
              type='email'
              className='input'
              onChange={(e) => setEmailNew(e.target.value)}
            />
          </div>
          <div className='field'>
            <label className='label'>Confirmation d'email</label>
            <input
              required
              id='EmailConfirmation'
              name='EmailConfirmation'
              type='email'
              className='input'
              onChange={(e) => setEmailConfirmation(e.target.value)}
            />
          </div>
        </div>
      </form>
      <form id='passwordForm' className='password'>
        <div className='field'>
          <label className='label'>Nouveau mot de passe</label>
          <input
            required
            name='password'
            type='password'
            className='input'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='field'>
          <label className='label'>Nouveau mot de passe</label>
          <input
            required
            name='password'
            type='password'
            className='input'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </form>
      <form id='infoForm'>
        <div className='field'>
          <label className='label'>Prénom</label>
          <input
            required
            name='firstname'
            type='text'
            className='input'
            value={firstname}
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
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className='field'>
          <label className='label'>Recherche d'adresse</label>
          <input
            id='searchAddress2'
            list='places'
            name='searchAddress'
            type='text'
            className='input'
            onChange={handleAddressChange}
            pattern={autocompleteAddress.join('|')}
            autoComplete='off'
            onBlur={splitAdress}
          />
        </div>
        <div className='field'>
          <label className='label'>Numéro + Rue</label>
          <input
            required
            id='address2'
            name='address'
            type='text'
            className='input'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <datalist id='places'>
          {autocompleteAddress.map((addresses, i) => (
            <option key={i}>{addresses}</option>
          ))}
        </datalist>
        {autocompleteErr && (
          <span className='inputError'>{autocompleteErr}</span>
        )}
        <div className='zipCity2'>
          <div className='field'>
            <label className='label'>Code Postal</label>
            <input
              required
              id='zipCode2'
              name='zipCode'
              type='text'
              className='input'
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className='field'>
            <label className='label'>Ville</label>
            <input
              required
              id='city2'
              name='city'
              type='text'
              className='input'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Pays</label>
          <input
            required
            id='country2'
            name='country'
            type='text'
            className='input'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className='field'>
          <label className='label'>Présentation</label>
          <input
            name='about'
            type='text'
            className='input'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className='OptionLogin'>
          <label className='checkbox'>
            <input
              name='cookie'
              type='checkbox'
              onClick={cookieClick}
              checked={cookieValue}
            />
            <span className='slider round'> </span> <p> Cookies </p>
          </label>
        </div>
      </form>
      <button className='button' onClick={handleSubmit}>
        {' '}
        Valider{' '}
      </button>
    </div>
  );
}

export default Settings;
