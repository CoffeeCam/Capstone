import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import SignupPage from '/src/client/components/SignupPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AllCharacters from '/src/client/components/AllCharacters.jsx';

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
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <NavBar />
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
        <Route path='/' element={<HomeTest />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/characters' element={<AllCharacters />} />
      </Routes>
    </div>
  );
};

export default App;