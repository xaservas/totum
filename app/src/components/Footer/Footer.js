import PropTypes from 'prop-types';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const createActivity = async (event) => {
    event.preventDefault();
    if (localStorage.getItem('id')) {
      navigate('/activity/create', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <footer id='footer' className='iconbar'>
      <button className='icon_create' onClick={createActivity}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className='navbar-item icon is-large'
        />
      </button>
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
