import React from 'react';
import Login from './Login.jsx';
import NavLinks from './NavLinks.jsx';
import { Link } from 'react-router-dom';
import Me from './me.jsx';
const NavBar = ({userId,isAdmin}) => {
  return (
    <>
    <div className="navbar">
      <h1>Hogwarts Rank-a-Thon</h1>
      {userId && isAdmin==false&&<Link to="/me"><button>User</button></Link>}
      {isAdmin&&<Link to="/allUser">All Users</Link>}
    {(userId)?(<Link to="/logout"> <button>Logout</button></Link>):(<Link to="/login"> <button>Login</button></Link>)}
   
    </div>
    <div>
      <NavLinks />
    </div>

    </>
  );
};

export default NavBar;
