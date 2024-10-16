import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const payload = {
            username: username,
            password: password,
        };
        const response = await axios.post('https://api.contigosanmarcos.com/auth/login', payload, {
            headers: {
              'Content-Type':'application/json'
            }
        });

        const { token } = response.data;

        localStorage.setItem('token', token);

        navigate('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials or server error.');
    }
};

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height to center vertically
    }}>
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <label style={{ color: 'white' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label style={{ color: 'white' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
