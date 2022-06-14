import React from 'react';
import './loginForm.scss';
import axios from 'axios'

function LoginForm(){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event) => {
        axios({
            method: 'post',
            url: 'https://api.totum.ovh/v1/user/login',
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
        Email : ${email}
        Mot de passe : ${password}
        `)
        event.preventDefault ();
    }

        return (
            <form onSubmit={handleSubmit} className="LoginForm">
                       
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
            <button className="button">Login</button>
            
        </form>
        );
};

export default LoginForm;
