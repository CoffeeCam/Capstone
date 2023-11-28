import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({token,setToken,setUserId,setIsAdmin,isAdmin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      return response;
    } catch (error) {
      throw new Error('Error during login');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser();

      if (response.ok) {
        const data = await response.json();
        console.log( data);
        console.log('Login successful!', data.message);
        const token=data.token;
        console.log(data.user);
        const userId=data.user.id;
        console.log(data.user.id);
        console.log(data.user.isadmin);
        setToken(token);
        setIsAdmin(data.user.isadmin);
        setUserId(userId);
        setSuccessMessage(data.message);
        setErrorMessage('');
        setIsLoggedIn(true);
          navigateTo('/')
       
      } else {
        const errorMessage = await response.text();
        try {
          const errorObj = JSON.parse(errorMessage);
          setErrorMessage(errorObj.message);
        } catch (error) {
          setErrorMessage(errorMessage);
        }
        setSuccessMessage('');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error logging in');
      setSuccessMessage('');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setErrorMessage('');
    setSuccessMessage('');
    setUsername('');
    setPassword('');
    localStorage.setItem('token',null);
    
  };

  return (
    <div>
      {successMessage && isLoggedIn && (
        <div style={{ color: '#e1e34d', fontWeight: 600, marginBottom: '10px' }}>
          {successMessage}
        </div>
      )}
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>LOG OUT</button>
          {/* Your logged-in content here */}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {errorMessage && (
            <div style={{ color: '#e3aa3a', fontWeight: 600, marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
      )}
    </div>
  );
};

export default Login;
