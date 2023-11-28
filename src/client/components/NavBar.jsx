import React from 'react';
import Login from './Login.jsx';
import NavLinks from './NavLinks.jsx';
import { Link } from 'react-router-dom';
//bk removed Me.jsx import because it isn't declared

 
  const NavBar = ({ userId, isAdmin }) => {
    return (
      <>
        <div className="navbar">
          <h1>Hogwarts Rank-a-Thon</h1>
          <div className="button-group">
            {userId && (
              <Link to="/me">
                <button className="navButton">My Reviews</button>
              </Link>
            )}
  
            {userId ? (
              <Link to="/logout">
                <button className="navButton">Logout</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            )}
          </div>
        </div>
        <div>
          <NavLinks userId={userId} isAdmin={isAdmin} />
        </div>
      </>
    );
  };

export default NavBar;
