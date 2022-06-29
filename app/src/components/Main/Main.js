// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// base page
import './main.scss';
import { useState } from 'react';
import Map from '../Map/Map';
import Activity from '../Activity/Activity';

// modal
import Activities from '../ListActivities/ListActivities';
import CreateActivity from '../CreateActivity/CreateActivity';
import Login from '../Login/Login';
import Profil from '../Profile/Profile';
import Settings from '../Settings/Settings';
import CreateProfil from '../CreateProfil/CreateProfile';
import Help from '../Settings/Help/Help';
import LegalMention from '../Settings/LegalMention/LegalMention';

function Desktop({ props, funct }) {
  const addActivity = props.addActivity ? 'isActive' : '';
  const profile = props.profile ? 'isActive' : '';
  const parameters = props.parameters ? 'isActive' : '';
  const user = props.user ? '' : 'isActive';
  const createUser = props.createProfile ? 'isActive' : '';
  const activity = props.activity ? 'isActive' : '';
  const listActivities = props.listActivities ? 'isActive' : '';
  const help = props.help ? 'isActive' : '';
  const legalMention = props.legalMention ? 'isActive' : '';
  const showListActivities = props.mainListActivities
    ? 'showActivitiesList'
    : '';

  const [popupControlle, setPopupControlle] = useState(false);

  const handlePopup = () => {
    setPopupControlle(!popupControlle);
  };

  const visible = popupControlle ? 'visible' : '';

  const Popup = () => (
    <div className={`popup ${visible}`} onClick={handlePopup}>
      <p>
        Impossible de supprimer l'activité, des utilisateurs se sont inscrit
      </p>
    </div>
  );

  return (
    <div className='desktop'>
      <Popup />
      <div className='left'>
        <div className='mapComposant'>
          <Map props={props} funct={funct} />
        </div>
      </div>
      <div className={`right ${showListActivities}`}>
        <div className='activitiesComposant'>
          <Activities props={props} funct={funct} popup={handlePopup} />
        </div>
      </div>

      {/* zone modal */}

      <div id='modalLegalmention' className={legalMention}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <LegalMention props={props} funct={funct} />
      </div>

      <div id='modalHelp' className={help}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Help props={props} funct={funct} />
      </div>

      <div id='modalActivity' className={activity}>
        <Activity props={props} funct={funct} />
      </div>

      <div id='modalCreateActivity' className={addActivity}>
        <CreateActivity props={props} funct={funct} />
      </div>

      <div id='modalLogin' className={user}>
        <Login funct={funct} props={props} />
      </div>

      <div id='modalProfil' className={profile}>
        <Profil props={props} funct={funct} />
      </div>

      <div id='modalSettings' className={parameters}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Settings props={props} funct={funct} />
      </div>

      <div id='modalCreateProfil' className={createUser}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <CreateProfil funct={funct} props={props} />
      </div>

      <div id='modalListActivities' className={listActivities}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Activities props={props} funct={funct} />
      </div>

      {/* fin zone modal */}
    </div>
  );
}

export default Desktop;
