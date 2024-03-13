import { ThemeProvider } from './components/ThemeProvider';
import { useReducer } from 'react';
import SearchUser from './components/SearchUser';
import { userReducer } from './components/functions/userReducer';
import { initialState } from './components/functions/initialState';
import UserList from './components/UserList';
import './index.css';

const App = () => {
  
  const [state, dispatch] = useReducer(userReducer, initialState);
 

  return (
      <>
      <ThemeProvider>
        <SearchUser dispatch={dispatch} state={state} />
        <UserList state={state} />
       </ThemeProvider>
      </>
  );
};

export default App;