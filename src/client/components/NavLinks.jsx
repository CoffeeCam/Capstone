import React from 'react';
import { Link } from 'react-router-dom';


const NavLinks = () => {
    return (
        <nav className='navlinks'>
          <Link to="/">HOME</Link>
          <span className="separator"></span>
          <Link to="/signup">CREATE AN ACCOUNT</Link>
        </nav>
      );
    };

export default NavLinks;