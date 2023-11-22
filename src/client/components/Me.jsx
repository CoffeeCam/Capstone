import React, { useEffect, useState } from 'react';


export default function Me({userId}){
    const [reviews,setReviews]=useState([]);
   useEffect(()=>{
    console.log(userId);
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
    reviewCreatedByUser();
   },[]);

   return(
    <div> 
        <h3> about user</h3>
        {reviews.map(r=>(
            <li key={r.id}>
            <p>character Name:{r.firstname} {r.lastname}</p>
            <p>Character House:{r.house}</p>
            <p >rating:{r.rating} </p>
            <p >review:{r.review}
          </p>
           <button>delete review</button>
           <button>update review</button>
            </li>
        ))}
    </div>
   )

}