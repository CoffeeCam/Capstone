import React, { useEffect, useState } from 'react';


export default function Me({userId}){
    const [reviews,setReviews]=useState([]);
   
   useEffect(()=>{
    console.log(userId);
   
    reviewCreatedByUser();
   },[]);
  
   const deleteReview=async(id)=>{
    console.log(id);
      const response=await fetch(`http://localhost:3000/api/reviews/${id}`,{
      method:'DELETE'
    });
    reviewCreatedByUser();
   console.log(response.status);
   
   }
   
   const reviewCreatedByUser=async()=>{
    try{
        const response=await fetch(`http://localhost:3000/api/reviews/user/${userId}`);
       const result=await response.json();
       console.log(result);
       setReviews(result);
       
    }catch(error){
       console.log(error);
    }
}
   
const editReview=async(id)=>{

   }
   return(
    <div> 
        <h3> about user</h3>
        {reviews.map(r=>(
            <li key={r.id}>
            <p>character Name:{r.firstname} {r.lastname}</p>
            <p>Character House:{r.house}</p>
            <p >rating:{r.rating} </p>
            <p >review:{r.review} </p>
            <p>{r.id}</p>
         
           <button onClick={()=>{deleteReview(r.id)}}>delete review</button>
           <button onClick={()=>{editReview(r.id)}}>update review</button>
            </li>
        ))}
    </div>
   )

}