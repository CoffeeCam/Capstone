import React, { useState } from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';



export default function SelectedCharacter(){
 
  let {id}=useParams();
  const[charDetails,setCharDetails]=useState({});
  const[reviewDetails,setReviewDetails]=useState([]);
  useEffect(()=>{
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
      console.log(res);
    
  }
    fetchSingleCharDetails();
    getReviews();
  },[]);
    
        
      
    
  return(
    <div >
        <p className="charname">Character Name :  {charDetails.firstname} {charDetails.lastname}</p>
        <p >Gender: {charDetails.sex}</p>
        <p >House: {charDetails.house}</p>
        <p >Role: {charDetails.role}</p>
        <p >Summary: {charDetails.summary}</p>
        <img src={charDetails.image} alt="characterImage" width={250} height={250}/>
        <p>

        </p>
      
        <h2>Reviews</h2>
        <ul>
       {reviewDetails.map(r=>(
        <li key={r.id}>
          
         <p style={{textAlign: 'left'}}>userEmail:{r.email} </p>
         <p style={{textAlign: 'left'}}>user House:{r.house} </p>
         <p style={{textAlign: 'left'}}>rating:{r.rating} </p>
         <p style={{textAlign: 'left'}}>review:{r.review}
          </p>
          
        </li>
       ))}
       </ul>
      
        
    </div>
  )
}
