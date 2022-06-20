import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';
import './search.scss';

function SearchSimple() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        method: 'get',
        url: `/activities/${search}/search`,
      });
      setResults(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <form className='simpleSearch' onSubmit={handleSubmit}>
      <input
        className='input_simpleSearch'
        type='text'
        name='search'
        placeholder='recherche'
        onChange={handleChange}
      />
      <button className='button_button' type='submit'>
        Rechercher
      </button>
    </form>
  );
}

export default SearchSimple;
