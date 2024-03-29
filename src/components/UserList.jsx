import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const UserList = ({ state, searchType, setUsers }) => {
  const { theme } = useContext(ThemeContext);

  const bgTheme = theme === 'light' ? 'bg-sky-200' : 'bg-sky-950';
  const textTheme = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={`${bgTheme} ${textTheme} p-4`}>
      {state.loading ? 'Loading...' : state.users.map(user => (
        <div key={user.id} className="flex items-center space-x-4 py-2">
          <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">{user.login}</h2>
            <a href={user.html_url} className={`${textTheme} hover:underline`}>{user.html_url}</a>
          </div>
         {searchType === 'array' && <DeleteButton key={user.id} user={user} setUsers={setUsers} />}
         {searchType === 'array' && <EditButton user={user} users={state.users} setUsers={setUsers} />}
        </div>
      ))}
      {state.error ? `Something went wrong: ${state.error}` : null}
    </div>
  );
};

UserList.propTypes = {
  state: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UserList;