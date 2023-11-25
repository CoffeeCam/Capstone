import React, { useState } from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';



export default function SelectedCharacter({isAdmin}){
 
  let {id}=useParams();
  const[charDetails,setCharDetails]=useState({});
  const[reviewDetails,setReviewDetails]=useState([]);
  const [ratings,setRatings]=useState([]);
  const [overAllRating,setOverAllRating]=useState('');
  const [total,settotal]=useState(0);
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
  const response=await fetch(`http://localhost:3000/api/reviews/rating/${id}`);
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
    
    const response=await fetch(`http://localhost:3000/api/reviews/review/${id}`,{
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
      const response=await fetch(`http://localhost:3000/api/reviews/${id}`,{
        method:'DELETE'
      })
      const result=response.status;
      getReviews();
    }    
      
    
  return(
    <div >
        <p className="charname">Character Name :  {charDetails.firstname} {charDetails.lastname}</p>
        <p >Gender: {charDetails.sex}</p>
        <p >House: {charDetails.house}</p>
        <p >Role: {charDetails.role}</p>
        <p >Summary: {charDetails.summary}</p>
        <p>OverAll Rating:{overAllRating}</p>
        <img src={charDetails.image} alt="characterImage" width={250} height={250}/>
       
        <p>

        </p>
      
        <h3>Reviews</h3>
        <div>
        {reviewDetails&&reviewDetails.length==0&&<h3>No reviews</h3>}
        <ul className="listings">
       {reviewDetails.map(r=>(
        <li key={r.id}className="listing-item" >
          <div className="listing-content">
                <div className="character-details">
                 
         <p className="charname"style={{textAlign: 'left'}}>username:{r.name} </p>
         <p style={{textAlign: 'left'}}>user House:{r.house} </p>
         <p style={{textAlign: 'left'}}>rating:{r.rating} </p>
         <p style={{textAlign: 'left'}}>review:{r.review}</p>
         </div>
         </div>
         {isAdmin&&<button onClick={()=>handleReviewDelete(r.id)}>Delete Review</button>}
          
          
        </li>
       ))}
       </ul>
      
       </div> 
    </div>
  )
}
