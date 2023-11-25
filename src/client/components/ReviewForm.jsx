import React, { useState } from 'react';

const gradeOptions = [
  { label: 'A+', value: 100 },
  { label: 'A', value: 95 },
  { label: 'A-', value: 90 },
  { label: 'B+', value: 85 },
  { label: 'B', value: 80 },
  { label: 'B-', value: 75 },
  { label: 'C+', value: 70 },
  { label: 'C', value: 65 },
  { label: 'C-', value: 60 },
  { label: 'D+', value: 55 },
  { label: 'D', value: 50 },
  { label: 'D-', value: 45 },
  { label: 'F+', value: 40 },
  { label: 'F', value: 35 },
  { label: 'F-', value: 30 }
];

function ReviewForm({charId,userId,token,}) {
  
  const [grade, setGrade] = useState('');
  const [writtenReview, setWrittenReview] = useState('');
  const[errormsg,setError]=useState('');
  const[isreRiewCreated,setIsReviewCreated]=useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res=await fetch('http://localhost:3000/api/reviews/isReviewPresent',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          charId:`${charId}`,
          creatorId: `${userId}`
        })
      });
      const res1=await res.json();
      console.log('isreviewPresent',res1);
      console.log(Object.keys(res1).length);
      
      if( Object.keys(res1).length<1){
        const response = await fetch('http://localhost:3000/api/reviews/createReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}` 
          },
          body: JSON.stringify({
            charId:`${charId}`,
            rating: `${grade}`,
            review: `${writtenReview}`
          }),
        });
       
        const result=await response.json();
        console.log('review created:',result);
      }else{
       
        setError('you Already created review for this character');
       
      }
    }catch(error){
       console.error("you already reviewed this character");
    }
    
    console.log(charId );
    console.log(userId);
    console.log(token);
    console.log(grade);
    console.log(writtenReview);

    // Reset the form fields after submission
   
    setGrade('');
    setWrittenReview('');
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          
          
        </div>
        <div>
          <label>Grade:</label>
          <div style={{ display: 'flex' }}>
          {gradeOptions.map((option) => (
            <div key={option.label} >
              <input
                type="radio"
                id={option.label}
                name="grade"
                value={option.label}
                checked={grade === option.label}
                onChange={(e) => setGrade(e.target.value)}
              />
              <label style={{ marginRight: '10px' }}htmlFor={option.label}>{option.label}</label>
            </div>
          ))}
          </div>
        </div>
        <div>
          <label htmlFor="writtenReview">Written Review:</label>
          <textarea
            id="writtenReview"
            value={writtenReview}
            onChange={(e) => setWrittenReview(e.target.value)}
            required
          />
        </div>
        {errormsg&&<div style={{ color: '#9c1203', fontWeight: 600, marginBottom: '10px' }}>{errormsg}</div>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;