import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyList from './pages/MyList';
import Subscription from './pages/Subscription';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import './App.css';
import useAuthStore from './store/authStore';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
}

export default App;
