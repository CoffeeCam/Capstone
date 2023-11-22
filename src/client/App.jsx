
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx'
import SignupPage from '/src/client/components/SignupPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [token,setToken]=useState(null);
  const [userId,setUserId]=useState(null);
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <NavBar token={token}/>
      <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button onClick={toggleDarkMode}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <Routes>
          <Route path='/' element={<HomeTest token={token} setToken={setToken} userId={userId}/>} />
          <Route path='/signup' element={<SignupPage token={token} setToken={setToken}/>} />
           <Route path='/login' element={<Login token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>} />
           <Route path='/logout' element={<Logout token={token} setToken={setToken} setUserId={setUserId}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;