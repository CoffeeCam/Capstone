
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import SelectedCharacter from './components/selectedCharacter.jsx';
import SignupPage from '/src/client/components/SignupPage.jsx';
import Me from './components/me.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AllCharacters from '/src/client/components/AllCharacters.jsx';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [token,setToken]=useState(null);
  const [userId,setUserId]=useState(null);
  const [isAdmin,setIsAdmin]=useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <NavBar token={token} userId={userId}/>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      
      <div className="search-toggle-container">
        <div className="search-form">
          {/* Search Form JSX */}
        </div>
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
        <Routes>
          <Route path='/' element={<HomeTest token={token} setToken={setToken} userId={userId} isAdmin={isAdmin}/>} />
          <Route path='/signup' element={<SignupPage token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>} />
           <Route path='/login' element={<Login token={token} setToken={setToken} userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
           <Route path='/me' element={<Me userId={userId} setUserId={setUserId}/>} />
           <Route path='/logout' element={<Logout setToken={setToken} setUserId={setUserId}/>} />
           <Route path="/character/:id" element={<SelectedCharacter/>} isAdmin={isAdmin}/>
           <Route path='/characters' element={<AllCharacters token={token} setToken={setToken} setUserId={setUserId} userId={userId} isAdmin={isAdmin}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;