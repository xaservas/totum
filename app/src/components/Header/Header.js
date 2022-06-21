import PropTypes from 'prop-types';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SearchSimple from '../Search/SearchSimple';
import Axios from '../../utils/axiosPool';

function Header() {
  const navigate = useNavigate();

  const showMenu = (event) => {
    event.preventDefault();
    const menu = document.getElementById('navbar-menu');
    menu.classList.toggle('showMenu');
  };

  const backToHome = async (event) => {
    event.preventDefault();
    navigate('/', { replace: true });
  };

  const logout = async (event) => {
    event.preventDefault();
    try {
      await Axios.get('/user/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const login = async () => {
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

  return (
    <header>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='totumtitle'>
          <h1 onClick={backToHome}>TOTUM</h1>
        </div>
        <SearchSimple />
        <a className='addActivity'>Proposer une activité</a>
        <div onClick={showMenu} className='icon' id='menu'>
          <FontAwesomeIcon icon={faUser} className='navbar-item ' />
        </div>
      </nav>
      <div className='navbar-menu' id='navbar-menu'>
        <div className='navbar-start'>
          <ul>
            <li onClick={profil}>Profile</li>
            <li onClick={setup}>Parametrès</li>

            {localStorage.getItem('id') ? (
              <li onClick={logout}>Déconnexion</li>
            ) : (
              <li onClick={login}>Connexion</li>
            )}
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
