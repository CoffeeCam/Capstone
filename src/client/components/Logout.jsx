import React, { useState } from 'react';

const Logout = ({setToken,setUserId}) => {
 setToken(null);
 setUserId(null);
}
export default Logout;