
import React from 'react';
import './createProfile.scss';
import axios from 'axios'
import OptionLogin from '../Login/OptionLogin/OptionLogin';


function CreateProfile({newValue, newValueB}){


    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [zip_code, setZip_code] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [about, setAbout] = React.useState("");

    
   

    const handleSubmit = (event) => {
        axios({
            method: 'post',
            url: 'https://api.totum.ovh/v1/user/createNew',
            data: {
                firstname: `${firstname}`,
                lastname: `${lastname}`,
                email : `${email}`,
                password: `${password}`,
                passwordConfirmation: `${passwordConfirmation}`,
                address: `${address}`,
                zip_code: `${zip_code}`,
                city: `${city}`,
                country: `${country}`,
                about: `${about}`,
                

            }
        })
        .then(function (response) {
            console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log (`
        Prénom : ${firstname}
        Nom : ${lastname}
        Email : ${email}
        Mot de passe : ${password}
        Adresse: ${address}
        Code Postal: ${zip_code}
        Ville : ${city}
        Pays: ${country}
        Présentation : ${about}
        `)
        event.preventDefault ();
    }

    


        return (
                <form onSubmit={handleSubmit} className='createProfile'>

            <input
            name="firstname"
            type="text"
            className="input"
             placeholder="Prénom"
             onChange={e => setFirstname (e.target.value)}
             />

            <input
            name="lastname"
            type="text"
            className="input"
             placeholder="Nom"
             onChange={e => setLastname (e.target.value)}
             />

            <input
            name="email"
            type="email"
            className="input"
             placeholder="Mail"
             onChange={e => setEmail (e.target.value)}
             />

            <div className="password">
            <input
            name="password"
            type="password"
            className="input"
            placeholder="Mot de passe"
            onChange={e => setPassword (e.target.value)}
            />

            <input
            name="passwordConfirmation"
            type="password"
            className="input"
            placeholder="Confirmation de Mot de passe"
            onChange={e => setPasswordConfirmation (e.target.value)}
            />
            </div>

            <input
            name="address"
            type="text"
            className="input"
            placeholder="Adresse"
            onChange={e => setAddress (e.target.value)}
            />

           <div className="zipCity">
           <input
            name="zip_code"
            type="text"
            className="input"
            placeholder="Code Postal"
            onChange={e => setZip_code (e.target.value)}
            />

            <input
            name="city"
            type="text"
            className="input"
            placeholder="Ville"
            onChange={e => setCity (e.target.value)}
            />
           </div>

            <input
            name="country"
            type="text"
            className="input"
            placeholder="Pays"
            onChange={e => setCountry (e.target.value)}
            />

            <input
            name="about"
            type="text"
            className="input"
            placeholder="Présentation"
            onChange={e => setAbout (e.target.value)}
            />
            <OptionLogin />



            <button className="button">Valider</button>
                </form>
             
        );
};

export default CreateProfile;
