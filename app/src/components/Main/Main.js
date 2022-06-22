import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import SearchAdvance from '../Search/SearchAdvance';

// base page
import './main.scss';
import Map from '../Map/Map';
import Activity from '../Activity/Activity';

// modal
import Activities from '../ListActivities/ListActivities';
import CreateActivity from '../CreateActivity/CreateActivity';
import Login from '../Login/Login';
import Profil from '../Profile/Profile';
import Settings from '../Settings/Settings';
import CreateProfil from '../CreateProfil/CreateProfile';

function Desktop({ props, funct }) {
  const addActivity = props.addActivity ? 'isActive' : '';
  const profile = props.profile ? 'isActive' : '';
  const parameters = props.parameters ? 'isActive' : '';
  const user = props.user ? '' : 'isActive';
  const createUser = props.createProfile ? 'isActive' : '';
  const activity = props.activity ? 'isActive' : '';
  const listActivities = props.listActivities ? 'isActive' : '';

  useEffect(() => {}, []);

  return (
    <div className='desktop'>
      <div className='left'>
        <div className='mapComposant'>
          <Map />
        </div>
      </div>
      <div className='right'>
        <div className='search'>
          <SearchAdvance />
        </div>
        <div className='activitiesList'>
          <Activities />
        </div>
      </div>

      {/* zone modal */}

      <div id='modalActivity' className={activity}>
        <Activity />
      </div>

      <div id='modalCreateActivity' className={addActivity}>
        <CreateActivity />
      </div>

      <div id='modalLogin' className={user}>
        <Login funct={funct} props={props} />
      </div>

      <div id='modalProfil' className={profile}>
        <Profil />
      </div>

      <div id='modalSettings' className={parameters}>
        <Settings />
      </div>

      <div id='modalCreateProfil' className={createUser}>
        <CreateProfil funct={funct} props={props} />
      </div>

      <div id='modalListActivities' className={listActivities}>
        <Activities props={props} />
      </div>

      {/* fin zone modal */}

      <FontAwesomeIcon
        onClick={() => funct.handleCreateActivity()}
        className='icon_create'
        icon={faCirclePlus}
      />
    </div>
  );
}

export default Desktop;
