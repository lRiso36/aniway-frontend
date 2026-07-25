import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
