import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
/*
HELLO
, je sais pas si tu es dans le coin mais pour gérer le responsive avec bulma je crois que j'ai trouvé un truc:
https://bulma.io/documentation/overview/responsiveness/
J'ai rajouté la class "is-mobile" à la navbar, c'est censé forcer le tout à s'afficher horizontalement, check si c'est bon!
Xav
*/

function Header({ ...rest }) {
  const navigate = useNavigate();

  const onClick = async (event) => {
    event.preventDefault();
    navigate('/', { replace: true });
  };

  const onClickLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const profil = async (event) => {
    event.preventDefault();
    navigate('/profile', { replace: true });
  };

  const setup = async (event) => {
    event.preventDefault();
    navigate('/profil/params', { replace: true });
  };

  const showMenu = (event) => {
    event.preventDefault();
    const menu = document.getElementById('navbar-menu');
    menu.classList.toggle('showMenu');
  };

  return (
    <header>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand title is large'>
          <div className='barre'>
            <div className='totumtitle'>
              <span onClick={onClick}>TOTUM</span>
            </div>
            <div onClick={showMenu} className='icon' id='menu'>
              <FontAwesomeIcon icon={faUser} className='navbar-item ' />
            </div>
          </div>
        </div>
      </nav>
      <div className='navbar-menu' id='navbar-menu'>
        <div className='navbar-start'>
          <ul>
            <li onClick={profil}>Profile</li>
            <li onClick={setup}>Parametrès</li>
            <li onClick={onClickLogout}>Déconnexion</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: '',
};
export default Header;
