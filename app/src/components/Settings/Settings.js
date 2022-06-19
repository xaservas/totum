import './settings.scss';

function Settings() {
  return (
    <div className='menu'>
      <ul className='menu-list'>
        <li>
          <a href='/settings/user'>Modifier les informations personelles</a>
        </li>
        <li>
          <a href='/settings/notifications'>Notifications, e-mails et SMS</a>
        </li>
        <li>
          <a href='/settings/legalMention'>Mentions légales</a>
        </li>
        <li>
          <a href='/settings/help'>Aide</a>
        </li>
        <li>
          <a href='/settings/mode'>Mode Sombre</a>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
