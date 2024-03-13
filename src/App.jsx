import { ThemeProvider } from './components/ThemeProvider';
import { useReducer, useState } from 'react';
import SearchUser from './components/SearchUser';
import { userReducer } from './components/functions/userReducer';
import { initialState } from './components/functions/initialState';
import UserList from './components/UserList';
import './index.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';


const App = () => {
  
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [searchType, setSearchType] = useState('github');
  
  const customArray =[{
    login: 'user1',
    id: 1,
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://youtube.com',
  }];
  const [users, setUsers] = useState(customArray);

  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/add" element={(
            <AddUserForm setUsers={setUsers} />
          )}
          />
          <Route path="/main" element={(
            <>
            <SearchUser dispatch={dispatch} state={state} customArray={users} setUsers={setUsers} searchType={searchType} setSearchType={setSearchType} />
            <UserList state={state} searchType={searchType} setUsers={setUsers} />
            </>
            )}
          />
           <Route path="/edit/:id" element={(
          <EditUserForm users={users} setUsers={setUsers}  />
            )}
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;