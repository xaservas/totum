import { useEffect, useState } from 'react';
import Axios from '../../utils/axiosPool';
import './search.scss';

function SearchSimple() {
// onSubmit
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
      if (response.data) {
        setResults(response.data);
        onSubmit(results);
      }

      /*
      redirect sur list activities
      alimenter list activities avec les résults en props
       */
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

SearchSimple.propTypes = {
  //onSubmit: PropTypes.func.isRequired,
};
export default SearchSimple;
