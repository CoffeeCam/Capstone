import React, { useState } from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';



export default function SelectedCharacter({isAdmin,token,userId}){
 
  let {id}=useParams();
  const[charDetails,setCharDetails]=useState({});
  const[reviewDetails,setReviewDetails]=useState([]);
  const [overAllRating,setOverAllRating]=useState('');
  const[comments,setComments]=useState([]);
  const[writeComment,setWriteComment]=useState('');
  const[selectedReview,setSelectedReview]=useState('');
  const grade = new Map([['A+', 100],['A ', 95],['A-', 90],
                        ['B+', 85],['B ', 80],['B-', 75],
                        ['C+', 70],['C ', 65],['C', 60],
                        ['D+', 55],['D ', 50],['D-', 45],
                        ['F+', 40],['F ', 35],['F-', 30]]);
  useEffect(()=>{
   
   fetchSingleCharDetails();
   getReviews();
   getoverAllRating();
    
   
  },[]);
  
  const fetchSingleCharDetails=async()=>{
    try{
       const response=await fetch(`/api/characters/character/${id}`)
       const result=await response.json();
       console.log(result);
       console.log(result.id);
       setCharDetails(result);
       
       
    }catch(error){

    }

}
const getoverAllRating=async()=>{
  const response=await fetch(`/api/reviews/rating/${id}`);
  const result=await response.json();
  console.log(result);
  const rat=new Array();
  result.map(r=>rat.push(r.rating));
  console.log(rat);
  const gradeValue=new Array();
  rat.map(r=>gradeValue.push(grade.get(r)));
  const sum = gradeValue.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   console.log(sum);
   let avg=sum/rat.length;
    avg=Math.round(avg / 5) * 5
   console.log("final avg:",avg);
   for (const [key, value] of grade.entries()) {
    if (value ==avg) {
      console.log(key);
       setOverAllRating(key);
    }}

}

  const getReviews=async()=>{
    
    const response=await fetch(`/api/reviews/review/${id}`,{
      method: 'GET',
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     } 
});
     const res=await response.json();
     setReviewDetails(res);
    

  
}
    
    const handleReviewDelete=async(id)=>{
      const response=await fetch(`/api/reviews/${id}`,{
        method:'DELETE'
      })
      const result=response.status;
      getReviews();
    }    
     const handleViewComment=async(reviewId)=>{
       setSelectedReview(reviewId);
       try{
        const response=await fetch(`/api/comments/review/comments/${reviewId}`);
        const result=await response.json();
        console.log(result);
        setComments(result);
      }catch(error){
      console.log(error);
     }
      }

     const handlecreateComment=async()=>{
      e.preventDefault();
      
      
     }

     
  return(
    <div >
      <div className='selectedCharDetails'>
           <p className="charname">{charDetails.firstname} {charDetails.lastname}</p>
           <p className="charrole" ><strong>{charDetails.role}</strong></p>
           <p ><strong>{charDetails.sex}</strong></p>
           <p ><strong>{charDetails.house}</strong></p>
          
           <p>Rating:<strong>{overAllRating}</strong></p>
           <p >{charDetails.summary}</p>
          <img src={charDetails.image} alt="characterImage" width={250} height={250}/>
      </div>
      
        <h3>Reviews</h3>
         <div >
          {reviewDetails&&reviewDetails.length==0&&<h3>No reviews</h3>}
          <ul>
          {reviewDetails.map(r=>(
            <div className='rewviewContainer'>
              <li key={r.id} >
                
                 <p >username:{r.name} </p>
                 <p >rating:{r.rating} </p>
                 <p>review:{r.review}</p>
         
                 {isAdmin&&<button onClick={()=>handleReviewDelete(r.id)}>Delete Review</button>}
                <button onClick={()=>{handleViewComment(r.id)}}>view Comments</button>
                  {token&&selectedReview&&selectedReview==r.id&&
                  <form onSubmit={handlecreateComment}>
                   <label htmlFor="comment">Write Comment</label>
                   <textarea
                   id="comment"
                   value={writeComment}
                   onChange={(e)=>setWriteComment(e.target.value)}/>
                    <button type="submit">create comment</button>
                    </form>} 
                  {selectedReview&&selectedReview==r.id&&
                <div>
                   <h4>comments</h4>
                   {comments.length<1&&<h3>No Comments</h3>}
                   <ul>
                     {comments.map(c=>
                      <div className="commentContainer">
                         <li key={c.id}>
                           <p>User:{c.name}</p>
                           <p>comment:{c.comment}</p>
                          </li>
                      </div>
                     )}
                    </ul>
                </div>}
              </li>
              
            </div>
             ))
           }
           </ul>
      
       </div> 
    </div>
  )
}
