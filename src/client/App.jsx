import React from 'react';
import NavBar from './components/NavBar.jsx';
import HomeTest from './components/HomeTest.jsx';
import SignupPage from '/src/components/SignupPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        
        <Routes>
          <Route path='/' element={<HomeTest />} />
          <Route path='/signup' element={<SignupPage />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;