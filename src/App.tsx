// import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

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
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Catch-all route that redirects to home */}
        <Route
          path="*"
          element={<Navigate to={user ? '/' : '/login'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
