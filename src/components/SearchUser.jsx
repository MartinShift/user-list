import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import axios from 'axios';
import { useDebounce } from './functions/useDebounce';
import PropTypes from 'prop-types';
import SearchTypeSelect from './SearchTypeSelect';
import { useNavigate } from 'react-router-dom';


const SearchUser = ({ dispatch, customArray, searchType,setSearchType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (searchType === 'github') {
        axios
          .get(`https://api.github.com/search/users?q=${debouncedSearchTerm}`)
          .then(response => {
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.items });
          })
          .catch(error => {
            dispatch({ type: 'FETCH_ERROR', payload: error });
          });
      } else if (searchType === 'array') {
        const results = customArray.filter(user => user.login.includes(debouncedSearchTerm));
        dispatch({ type: 'FETCH_SUCCESS', payload: results });
      }
    } else {
      dispatch({ type: 'FETCH_SUCCESS', payload: [] });
    }
  }, [debouncedSearchTerm, dispatch, searchType]);


  const bgTheme = theme === 'light' ? 'bg-sky-200' : 'bg-sky-950';
  const btnTheme = theme === 'light' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-200 text-black';
  const inputTheme = theme === 'light' ? 'border border-gray-300' : 'border border-white';

  return (
    <div className={`${bgTheme} p-4`}>
      <SearchTypeSelect searchType={searchType} setSearchType={setSearchType} />
      <button className={`${btnTheme} font-bold py-2 px-4 rounded`} onClick={toggleTheme}>Toggle theme</button>
      <input
        className={`${inputTheme} rounded py-2 px-4`}
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for users"
      />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/add')}>
              Add User
            </button> 
    </div>
  );
};

SearchUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  customArray: PropTypes.array.isRequired,
  searchType: PropTypes.string.isRequired,
  setSearchType: PropTypes.func.isRequired,
};
export default SearchUser;