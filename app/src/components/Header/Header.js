import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser  } from '@fortawesome/free-solid-svg-icons'

/*
HELLO
, je sais pas si tu es dans le coin mais pour gérer le responsive avec bulma je crois que j'ai trouvé un truc:
https://bulma.io/documentation/overview/responsiveness/
J'ai rajouté la class "is-mobile" à la navbar, c'est censé forcer le tout à s'afficher horizontalement, check si c'est bon! 
Xav
*/

function Header({...rest}){
   return (
       <header>  
        <nav class="navbar" role="navigation" aria-label="main navigation">
         <div  class="navbar-brand title is large">
            <div className='barre'>
                <div className='title'>
                TOTUM 
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
