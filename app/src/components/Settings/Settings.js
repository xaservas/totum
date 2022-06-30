/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './settings.scss';
import axios from '../../utils/axiosPool';
import mapbox from '../../utils/mapbox';

function Settings({ props, funct }) {
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
  const [cookieValue, setCookieValue] = useState(false);

  const [autocompleteAddress, setAutocompleteAddress] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');
  const [error, setError] = useState('');

  // const [error, setError] = useState('');
  const userId = JSON.parse(localStorage.getItem('id'));

  // gestion des erreurs--------------
  const errorMessage = (data) => {
    switch (data) {
    case 401:
      setError('401');
      break;
    case 400:
      setError('400');
      break;
    case 200:
      setError('Compte modifié');
      break;
    default:
      setError('default error');
      break;
    }
  };

  // autocomplete address

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);
    if (!address) return;

    const res = await mapbox(address);
    !autocompleteAddress.includes(e.target.value)
      && res.features
      && setAutocompleteAddress(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('');
  };

  // check letters and numbers password
  // const checkPassword = () => {
  //   if
  // }

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

  // Suppression du compte

  const Delete = () => {
    axios({
      method: 'delete',
      url: `user/${userId}/manage`,

    })
      .then(() => {
        funct.closeAllModal();
      })
      .catch(() => {
        errorMessage("Le compte n'as pas été supprimé");
      });
  };

  //  Maj du formulaire

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
          .then(() => {
            funct.closeAllModal();
          })
          .catch(() => {
            // ajouter un message d'information si sa marche pas
            errorMessage('les mots de passe ne correspondent pas aux critères');
          });
        setError('Profil mis à jour');
      }
      setError('mot de passe pas pareil');
    }

    if (emailNew !== '' && emailConfirmation !== '') {
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
          .then(() => {
            funct.closeAllModal();
          })
          .catch((err) => {
            errorMessage(err.response.status);
          });
        setError('Profil mis à jour');
      }
      setError('Profil mis à jour2');
    }

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
      .then(() => {
        funct.closeAllModal();
      })
      .catch((err) => {
        // ajouter un message d'information si sa marche pas
        errorMessage(err.response.status);

        // return 'les mails sont identiques';
      });
  };

  return (
    <div className='changeProfile'>
      <FontAwesomeIcon
        icon={regular('circle-xmark')}
        onClick={() => funct.closeAllModal()}
        className='profil-close'
      />
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
      <form id='passwordForm' className='passwordfusion'>
        <div className='field'>
          <label className='label'>Nouveau mot de passe</label>
          <input
            required
            name='password'
            type='password'
            className='input'
            onChange={(e) => setPassword(e.target.value)}
            // onBlur={checkPassword}
          />
        </div>
        <div className='field'>
          <label className='label'>Confirmation</label>
          <input
            required
            name='passwordConfirmation'
            type='password'
            className='input'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </form>
      <form id='infoForm'>
        <div className='nomfusion'>
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
        </div>
        <div className='field' id='searchAddress'>
          <label className='label'>Recherche d'adresse</label>
          <input
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
              defaultChecked={cookieValue}
            />
            <span className='slider round'> </span> <p> Cookies </p>
          </label>
        </div>
      </form>

      <p style={{ color: 'red' }} className='errorMessage'>
        {error}
      </p>
      <button className='validation-button' onClick={handleSubmit}>
        Valider
      </button>
      <button className='delete-button' onClick={Delete}> Supprimer compte </button>
    </div>
  );
}

export default Settings;
