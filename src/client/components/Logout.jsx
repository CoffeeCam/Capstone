import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setToken,setUserId,setIsAdmin}) => {
 const navigateTo = useNavigate();
 
 setToken(null);
 setUserId(null);
 setIsAdmin(null);
 navigateTo('/');
 
 return(
   <div>

   </div>
 )
}
export default Logout;

