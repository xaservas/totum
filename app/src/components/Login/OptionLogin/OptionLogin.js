

import './optionLogin.scss';

function OptionLogin(){
        return (
            <div className="OptionLogin">
            <label className="checkbox">
                <input type="checkbox"/>
                <span className="slider round"></span>
                <p>Géolocalisation</p>
            </label>
            <label className="checkbox">
                <input type="checkbox"/>
                <span className="slider round"></span>
                <p>Coockies</p>
            </label>
            
        </div>
        );
};

export default OptionLogin;
