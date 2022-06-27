import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './Footer.scss';

function Footer({ props, funct }) {
  return (
    <footer id='footer' className='iconbar'>
      <p className='copyright'>&copy;{new Date().getFullYear()} totum.ovh</p>
      <ul className='footerNav'>
        <li>
          <a
            className='legalMention'
            onClick={() => funct.handleLegalmention()}>
            Conditions générales
          </a>
        </li>
        <li>
          <a className='askHelp' onClick={() => funct.handleHelp()}>
            Nous contacter
          </a>
        </li>
        <li>
          <a>Confidentialité</a>
        </li>
      </ul>
      <FontAwesomeIcon
        icon={faCirclePlus}
        className='addActivity'
        onClick={
          props.isLogged ? funct.handleCreateActivity : funct.handleLogin
        }
      />
    </footer>
  );
}

export default Footer;
