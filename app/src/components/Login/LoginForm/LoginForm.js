
import React,{useEffect} from 'react';
import './loginForm.scss';
import { useNavigate } from "react-router-dom";

import axios from '../../../utils/axiosPool'
//import { saveAuthorization } from '../../../utils/axiosPool';
// import PropTypes from 'prop-types';



/* https://www.bezkoder.com/react-jwt-auth/  jwt without redux>>>>trop long, local storage???*/
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

function LoginForm({
    setToken
}){
    let navigate = useNavigate();
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

      const handleLogout = async (event) => {
          axios({
              method: 'get',
              url: '/user/logout',
          })
          setEmail("");
          setPassword("");
          localStorage.clear();
          console.log('tu es déco')
      }

      const saveUser = (data) => {
        Object.keys(data).forEach(key => {
            localStorage.setItem(key, data[key])
        });
      };



    const handleSubmit = async (event) => {
        axios({
            method: 'post',
            url: '/user/login',
            data: {
                email : `${email}`,
                password: `${password}`
            },
        })
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            saveUser(response.data.user)
            navigate("/activities",{replace: true })
           /*
           si on reçoit le token
           on est redirigé vers la liste des activités
           sinon on reste sur place */
            
          })
          .catch(function (error) {

            console.log(error);
          });
         // console.log(instanceAxios);
        //   axios.get('https://api.totum.ovh/v1/user/logout', {
        //       headers: {
        //           Authorization: `bearer ${token}`
        //       },
        //   })
        console.log(axios);

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
                   <button className="button" onClick={handleLogout}>Déco</button>
            </div>
        );
};


// LoginForm.propTypes = {
//     setToken: PropTypes.func.isRequired
// };

export default LoginForm;
