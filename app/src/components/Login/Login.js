import './Login.scss';
import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import OptionLogin from './OptionLogin/OptionLogin';


function Login(){
    


        return (
                <div className='login'>
                    
                    <OptionLogin/>
                    <a href="/">Pas encore inscrit ?</a>
                    <LoginForm/>
                    <a href="/">Découvrir l'application</a>
                </div>
        );
};

export default Login;
