import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Battery from './pages/Battery';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const location = useLocation();

  // Determine if the current path is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && <NavBar />} {/* Conditionally render NavBar */}
      <div style={{ marginLeft: isLoginPage ? '0' : '100px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/battery' element={<Battery/>} />
        </Routes>
      </div>
    </div>
  );
};

const Root: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
