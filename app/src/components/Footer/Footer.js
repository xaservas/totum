import PropTypes from 'prop-types';
import './Footer.scss';

function Footer() {
  return (
    <footer id='footer' className='iconbar'>
      <p class='copyright'>&copy;{new Date().getFullYear()} totum.ovh</p>
      <ul className='footerNav'>
        <li>
          <a href='#'>Conditions générales</a>
        </li>
        <li>
          <a href='#'>Plan du site</a>
        </li>
        <li>
          <a href='#'>Confidentialité</a>
        </li>
      </ul>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};
Footer.defaultProps = {
  className: '',
};
export default Footer;
