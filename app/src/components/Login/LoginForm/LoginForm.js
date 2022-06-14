import React from 'react';
import './LoginForm.scss';
import axios from '../../../utils/axiosPool'
// import PropTypes from 'prop-types';

const instance  = axios.create({
    baseUrl: 'https://api.totum.ovh/v1/',
   /* headers: {
                  Authorization: `bearer ${"token"}`
              },*/
    
});

/* https://www.bezkoder.com/react-jwt-auth/  jwt without redux>>>>trop long, local storage???*/
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

function LoginForm({
    setToken
}){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [token, setToken] = React.useState("");
    

    const handleSubmit = async (event) => {
        axios({
            method: 'post',
            url: 'https://api.totum.ovh/v1/user/login',
            data: {
                email : `${email}`,
                password: `${password}`
            },
        })
        .then(function (response) {
            localStorage.setItem('token', response.data.token);
          })
          .catch(function (error) {
           // console.log(error);
          });
         // console.log(instanceAxios);
        {/*console.log (`
        Email : ${email}
        Mot de passe : ${password}
        `)*/}

        //   axios.get('https://api.totum.ovh/v1/user/logout', {
        //       headers: {
        //           Authorization: `bearer ${token}`
        //       },
        //   })



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


// LoginForm.propTypes = {
//     setToken: PropTypes.func.isRequired
// };

export default LoginForm;
