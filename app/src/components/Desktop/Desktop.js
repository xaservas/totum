import { useEffect } from 'react';
import SearchAdvance from '../Search/SearchAdvance';
import './desktop.scss';

import Map from '../Map/Map';
import Activities from '../ListActivities/ListActivities';
import Activity from '../Activity/Activity';

function Desktop() {
  useEffect(() => {

  }, []);

  return (
    <div className='desktop'>
      <div className='left'>
        <div className="mapComposant">
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

      <div className="modal_activity">
        <Activity />
      </div>

    </div>
  );
}

export default Desktop;
