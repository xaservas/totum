/* eslint-disable no-console */
import React from 'react';

// import { useNavigate } from 'react-router-dom';
import './createProfile.scss';

import axios from 'axios';
// import PlacesAutocomplete from 'react-places-autocomplete';

function CreateProfile() {
  // const navigate = useNavigate();

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [zipCode, setZipcode] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [coordinate, setCoordinate] = React.useState([]);
  const [cookieValue, setCookieValue] = React.useState(false);
  const [landmarkValue, setLandmarkValue] = React.useState(false);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLandmarkValue(true);
      setCoordinate([
        (coordinate[0] = position.coords.latitude),
        (coordinate[1] = position.coords.longitude),
      ]);
    });
  }

  const landmarkClick = () => {
    const newValue = !landmarkValue;
    setLandmarkValue(newValue);
    console.log(newValue);
  };

  const cookieClick = () => {
    const newValueB = !cookieValue;
    setCookieValue(newValueB);

    console.log(newValueB);
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
      .then((response) => {
        console.log(response);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(`

        Prénom : ${firstname}
        Nom : ${lastname}
        Email : ${email}
        Mot de passe : ${password}
        Adresse: ${address}
        Code Postal: ${zipCode}
        Ville : ${city}
        Pays: ${country}
        Présentation : ${about}
        cookie:${cookieValue}
        landmark: ${landmarkValue}
        `);

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='createProfile'>
      <input
        name='firstname'
        type='text'
        className='input'
        placeholder='Prénom'
        onChange={(e) => setFirstname(e.target.value)}
      />

      <input
        name='lastname'
        type='text'
        className='input'
        placeholder='Nom'
        onChange={(e) => setLastname(e.target.value)}
      />

      <input
        name='email'
        type='email'
        className='input'
        placeholder='Mail'
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className='password'>
        <input
          name='password'
          type='password'
          className='input'
          placeholder='Mot de passe'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          name='passwordConfirmation'
          type='password'
          className='input'
          placeholder='Confirmation de Mot de passe'
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <input
        name='address'
        type='text'
        className='input'
        placeholder='Adresse'
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className='zipCity'>
        <input
          name='zip_code'
          type='text'
          className='input'
          placeholder='Code Postal'
          onChange={(e) => setZipcode(e.target.value)}
        />

        <input
          name='city'
          type='text'
          className='input'
          placeholder='Ville'
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <input
        name='country'
        type='text'
        className='input'
        placeholder='Pays'
        onChange={(e) => setCountry(e.target.value)}
      />

      <input
        name='about'
        type='text'
        className='textarea'
        placeholder='Présente toi en quelques ligne'
        onChange={(e) => setAbout(e.target.value)}
      />

      <div className='OptionLogin'>
        <label className='checkbox'>
          <input name='landmark' type='checkbox' onClick={landmarkClick} />
          <span className='slider round'></span>
          <p>Géolocalisation</p>
        </label>
        <label className='checkbox'>
          <input name='cookie' type='checkbox' onClick={cookieClick} />
          <span className='slider round'></span>
          <p>Coockies</p>
        </label>
      </div>

      <button className='button'>Valider</button>
    </form>
  );
}

export default CreateProfile;
