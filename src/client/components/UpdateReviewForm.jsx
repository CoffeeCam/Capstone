import React, { useState,useEffect } from 'react';

export default function UpdateReviewForm({reviewId}){
 const [grade,setGrade]=useState('');
 const [review,setReview]=useState('');
 const [err,seterr]=useState('');



const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
       const response=await fetch(`http://localhost:3000/api/reviews/reviewUpdate/${reviewId}`,{
        method:'PATCH',
        header:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: `${grade}`,
            review: `${review}`
          })
       })
       const result=await response.json();
       console.log(result);
    }catch(err){
       console.log(err);
    }
}


 


 return(
    <div>
        <h2> Update Review</h2>
       <form onSubmit={handleSubmit}>
       <label htmlFor="Input">Update grade </label>
      <input
        type="text"
        id="Input"
        value={grade}
        onChange={(e)=>setGrade(e.target.value)}
         />

        <label htmlFor='updateReview'>Update Review</label>
       <textarea
       id="updateReview"
       value={review}
       onChange={(e)=>setReview(e.target.value)}/>
       {err&&<div style={{ color: '#9c1203', fontWeight: 600, marginBottom: '10px' }}>{err}</div>}
       <button type="submit">Submit Review</button>
       </form>
       </div>
 )
}