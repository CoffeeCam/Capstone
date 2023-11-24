import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Me({userId}){
  const navigateTo = useNavigate();
    const [reviews,setReviews]=useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviewId,setReviewId]=useState('');
    const [grade,setGrade]=useState('');
    const [review,setReview]=useState('');
    const [err,seterr]=useState('');
   
   useEffect(()=>{
    console.log(userId);
    reviewCreatedByUser();
    if(userId==null){
      navigateTo('/');
    }
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

const handleReviewClick = (review) => {
    setSelectedReview(review);
    setReviewId(review.id);
    
  };   
  const handleSubmitReview = async(e) => {
    e.preventDefault();
    console.log(grade);
    console.log(review);
    console.log(reviewId);
    try{
      const response=await fetch(`http://localhost:3000/api/reviews//reviewUpdate/${reviewId}`,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating:grade,
          review: review
        })
      });
      const result=await response.json();
      console.log(result);
   }catch(err){
      console.log(err);
   }
  };

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
           <button onClick={() => {handleReviewClick(r)}}>Update Review</button>
           {selectedReview && selectedReview.id == r.id && (
                   <div>
                   <h2> Update Review</h2>
                  <form onSubmit={handleSubmitReview}>
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
                )}
     
            </li>
        ))}
    </div>
   )

}