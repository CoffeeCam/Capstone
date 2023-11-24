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
      
    {(token)?(<Link to="/logout"> <button>Logout</button></Link>):(<Link to="/login"> <button>Login</button></Link>)}
    {userId &&<Link to="/me"><button>User</button></Link>}
    </div>
    <div>
      <NavLinks />
    </div>

    </>
  );
};

export default NavBar;
