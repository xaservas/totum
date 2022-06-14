import React,{useEffect} from 'react';
import './loginForm.scss';
import axios from '../../../utils/axiosPool'

// import PropTypes from 'prop-types';


/* https://www.bezkoder.com/react-jwt-auth/  jwt without redux>>>>trop long, local storage???*/
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

function LoginForm({
    setToken
}){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [user, setUser] = React.useState("");
    // const [token, setToken] = React.useState("");
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        if (loggedInUser) {
          console.log('tu es logué')
        } else {
            console.log('blabla')
        }
      }, []);

      const hangleLogout = async (event) => {
          setEmail("");
          setPassword("");
          localStorage.clear();
          console.log('tu es déco')
      }



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
           console.log(error);
          });
        
        event.preventDefault ();
    }

        return (
            <div>
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
                   <button className="button" onClick={hangleLogout}>Déco</button>
            </div>
        );
};


// LoginForm.propTypes = {
//     setToken: PropTypes.func.isRequired
// };

export default LoginForm;
