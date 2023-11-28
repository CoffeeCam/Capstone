import React from 'react';
import { Link } from 'react-router-dom';


const NavLinks = ({userId,isAdmin}) => {
    return (
        <nav className='navlinks'>
          <Link to="/">HOME</Link>
          {!userId&&  <><span className="separator"></span>
         <Link to="/signup">CREATE AN ACCOUNT</Link></>}
         {isAdmin&&  <><span className="separator"></span>
         <Link to="/allUser">All User</Link></>}
          <span className="separator"></span>
          <Link to="/characters">ALL CHARACTERS</Link>
        </nav>
      );
    };

export default NavLinks;