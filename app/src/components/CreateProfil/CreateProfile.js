
import React from 'react';
import './CreateProfile.scss';
import axios from 'axios'

function CreateProfile(){


    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
     const [adress, setAdress] = React.useState("");
     const [description, setDescription] = React.useState("");

    const handleSubmit = (event) => {
        axios({
            method: 'post',
            url: 'https://api.totum.ovh/v1/user/createNew',
            data: {
                email : 'test@test.com',
                password: 'hash'
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
        Adresse: ${adress}
        Présentation : ${description}
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

            <input
            name="password"
            type="password"
            className="input"
            placeholder="Mot de passe"
            onChange={e => setPassword (e.target.value)}
            />

            <input
            name="adress"
            type="text"
            className="input"
            placeholder="Adress"
            onChange={e => setAdress (e.target.value)}
            />

            <input
            name="description"
            type="text"
            className="input"
            placeholder="Présentation"
            onChange={e => setDescription (e.target.value)}
            />



            <button className="button">Valider</button>
                </form>
        );
};

export default CreateProfile;
