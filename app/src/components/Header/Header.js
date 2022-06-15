import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser  } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
/*
HELLO
, je sais pas si tu es dans le coin mais pour gérer le responsive avec bulma je crois que j'ai trouvé un truc:
https://bulma.io/documentation/overview/responsiveness/
J'ai rajouté la class "is-mobile" à la navbar, c'est censé forcer le tout à s'afficher horizontalement, check si c'est bon! 
Xav
*/

function Header({...rest}){
    let navigate = useNavigate();

    const onClick = async (event) => {
        event.preventDefault();
        navigate("/", { replace: true });
    }

   return (
       <header>  
        <nav className="navbar" role="navigation" aria-label="main navigation">
         <div  className="navbar-brand title is large">
            <div className='barre'>
                <div className='totumtitle'>
                    <span onClick={onClick}>TOTUM</span>
                </div>
                <div className='icon'>
                    <FontAwesomeIcon icon={faUser} className='navbar-item ' />
                
                </div>
                
            </div>
            
          
         </div>
        </nav>
        
        </header>
   );
};

Header.propTypes = {
    className: PropTypes.string,
};
Header.defaultProps = {
    className: '',
};
export default Header;
