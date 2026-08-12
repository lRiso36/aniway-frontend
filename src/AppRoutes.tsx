import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/auth/SignUp';
import { Login } from './pages/auth/Login';
import { Browse } from './pages/Browse';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* need to be proected */}
      <Route path="/browse" element={<Browse />} />
    </Routes>
  );
}
