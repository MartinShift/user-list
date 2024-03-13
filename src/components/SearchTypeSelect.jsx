import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const SearchTypeSelect = ({ searchType, setSearchType }) => {

    const {theme} = useContext(ThemeContext);
return (
    <select
        value={searchType}
        onChange={e => setSearchType(e.target.value)}
        className={`border border-gray-300 rounded py-2 px-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} text-black`}>
        <option value="github">GitHub</option>
        <option value="array">Array</option>
    </select>
);
};

SearchTypeSelect.propTypes = {
  searchType: PropTypes.string.isRequired,
  setSearchType: PropTypes.func.isRequired,
};

export default SearchTypeSelect;