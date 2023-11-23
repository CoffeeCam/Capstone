import React from 'react';
import Login from './Login.jsx';
import NavLinks from './NavLinks.jsx';
import { Link } from 'react-router-dom';
import Me from './me.jsx';
const NavBar = ({token,userId}) => {
  return (
    <>
    <div className="navbar">
      <h1>Hogwarts Rank-a-Thon</h1>
      
    {(token)?(<Link to="/logout"> Logout</Link>):(<Link to="/login"> Login</Link>)}
    {userId &&<Link to="/me">User</Link>}
    </div>
    <div>
      <NavLinks />
    </div>

    </>
  );
};

export default NavBar;
