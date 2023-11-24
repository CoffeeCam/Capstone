import React, { useState, useEffect } from 'react';


export default function AllUser({isAdmin}){
  const [userList,setUserList]=useState([]);
 
    useEffect(()=>{
        getAllUsers();
    },[])

    const deleteUser=async(id)=>{
      const response=await fetch(`http://localhost:3000/api/users/user/${id}`,{
      method:'DELETE'
    });
    const result=response.status;
    
    getAllUsers();
    }
    const getAllUsers=async()=>{
        try{
        const response=await fetch(`http://localhost:3000/api/users/alluser`);
        const result= await response.json();
      
            setUserList(result);
          
            
       }catch(error){
        console.log(error);
       }
    }
   

    return(
        <div>
           {isAdmin&&
            <ul className="listings">
                {userList&&userList.map(user=>(
                <li key={user.id} className="listing-item">
                    <div className="listing-content">
                <div className="character-details">
                <p className="charname">username:{user.name}</p>  
                <p>email:{user.email}</p>
                <p>house:{user.house}</p>
                </div>
                </div>
                <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
                </li> 
                ))}
            </ul>
            }
        </div>
    )
}