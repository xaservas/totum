import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// base page
import './header.scss';
import SearchSimple from '../Search/SearchSimple';

function Header({ props, funct }) {
  const showMenu = props.showMenu ? 'showMenu' : '';

  return (
    <header className='header'>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='totumtitle'>
          <h1>TOTUM</h1>
        </div>
        <SearchSimple props={props} funct={funct} />
        <a
          className='addActivity'
          onClick={
            props.isLogged ? funct.handleCreateActivity : funct.handleLogin
          }>
          Proposer une activité
        </a>
        <div className='icon' id='menu'>
          <FontAwesomeIcon
            icon={faUser}
            className='navbar-item'
            onClick={() => funct.handleMenu()}
          />
        </div>
      </nav>
      <div className={`navbar-menu ${showMenu}`} id='navbar-menu'>
        <div className='navbar-start'>
          <ul>
            <li
              onClick={
                props.isLogged ? funct.handleProfile : funct.handleLogin
              }>
              Profile
            </li>
            <li
              onClick={
                props.isLogged ? funct.handleParameters : funct.handleLogin
              }>
              Parametrès
            </li>

            {props.isLogged ? (
              <li onClick={() => funct.handleLogout()}>Déconnexion</li>
            ) : (
              <li onClick={() => funct.handleLogin()}>Connexion</li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
