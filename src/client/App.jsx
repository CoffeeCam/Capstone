
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import SignupPage from '/src/client/components/SignupPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <NavBar />
      <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button onClick={toggleDarkMode}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <Routes>
          <Route path='/' element={<HomeTest />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;