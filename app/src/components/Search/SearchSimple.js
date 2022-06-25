import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosPool';
import './search.scss';

function SearchSimple({ funct }) {
  const [search, setSearch] = useState('kouech');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const resetChange = () => {
    setSearch('kouech');
    funct.resetActivitiesList();
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios({
        method: 'get',
        url: `/activities/${search}/search`,
      });
      funct.handleActivitiesList(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        funct.handleActivitiesList([
          {
            id: 404,
            name: "Désolé il n'y à pas d'activités pour le moment",
          },
        ]);
      }
    }
  };

  useEffect(() => {
    if (search.length === 0) {
      resetChange();
    }
    handleSubmit();
  }, [search]);

  return (
    <div className='simpleSearch'>
      <input
        className='input_simpleSearch'
        type='text'
        name='search'
        placeholder='recherche'
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default SearchSimple;
