import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SearchAdvance from '../Search/SearchAdvance';
import './desktop.scss';

import Map from '../Map/Map';
import Activities from '../ListActivities/ListActivities';
import Activity from '../Activity/Activity';

function Desktop() {
  const navigate = useNavigate();

  const createActivity = async (event) => {
    event.preventDefault();
    if (localStorage.getItem('id')) {
      navigate('/activity/create', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

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

      <div className='modal_activity'>
        <Activity />
      </div>

      <FontAwesomeIcon
        className='icon_create'
        onClick={createActivity}
        icon={faCirclePlus}
      />
    </div>
  );
}

export default Desktop;
