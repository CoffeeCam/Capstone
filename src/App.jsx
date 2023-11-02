import React from 'react';
import NavBar from './components/NavBar.jsx';
import './App.css';
import Login from './components/Login.jsx';

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <h2>Main Content</h2>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default App;