
import React, { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import SignupPage from '/src/client/components/SignupPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div>
      <NavBar />
      <div className={`main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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