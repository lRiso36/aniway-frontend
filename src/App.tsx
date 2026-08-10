// import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function checkLocalStorageForUser() {
  //     const localUser = localStorage.getItem('user');
  //     if (localUser) {
  //       console.log('User found in local storage:', JSON.parse(localUser));
  //       setUser(JSON.parse(localUser));
  //     } else {
  //       console.log('No user found in local storage.');
  //       localStorage.setItem('user', JSON.stringify({ username: 'testUser' }));
  //     }
  //   }
  //   checkLocalStorageForUser();
  // }, []);

  return (
    <Router>
      <Toaster />
      <AppRoutes />
    </Router>
  );
}

export default App;
