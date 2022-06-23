import './Footer.scss';

function Footer({ funct }) {
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
          <a href='#'>Confidentialité</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
