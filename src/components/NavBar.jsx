import React from 'react';
import Login from './Login.jsx';
// import SignupPage from './SignupPage.jsx';

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Hogwarts Rank-a-Thon</h1>
      {/* <SignupPage /> */}
      <Login />
    </div>
  );
};

export default NavBar;