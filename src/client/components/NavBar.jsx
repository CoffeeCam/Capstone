import React from 'react';
import Login from './Login.jsx';
import NavLinks from './NavLinks.jsx';
import { Link } from 'react-router-dom';

const NavBar = ({token}) => {
  return (
    <>
    <div className="navbar">
      <h1>Hogwarts Rank-a-Thon</h1>
      {(token)?(<Link to="/logout"> Logout</Link>):(<Link to="/login"> Login</Link>)}
    </div>
    <div>
      <NavLinks />
    </div>

    </>
  );
};

export default NavBar;
