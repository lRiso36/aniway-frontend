import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/auth/SignUp';
import { Login } from './pages/auth/Login';
import { Browse } from './pages/Browse';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { AppLayout } from './components/common/AppLayout';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* need to be proected */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/browse" element={<Browse />} />
        <Route path='/settings' element={<Settings/>} />
      </Route>
    </Routes>
  );
}
