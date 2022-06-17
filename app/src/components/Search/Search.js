import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

function Search({ ...rest }) {
  const [activity, setActivity] = React.useState({
    name: '',
    date: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((previousActivity) => ({
      ...previousActivity,
      [name]: value,
    }));
    console.log(activity);
  };

  return (
    <form className={'search'} {...rest}>
      <div className='field'>
        <label className='label'>Activité</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='activité'
            name='name'
            value={activity.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Date</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='date'
            name='date'
            value={activity.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Address</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='address'
            name='address'
            value={activity.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

Search.propTypes = {
  className: PropTypes.string,
};
Search.defaultProps = {
  className: '',
};
export default Search;
