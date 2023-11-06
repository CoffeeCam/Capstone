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

function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your logic here to handle the submission of the review
    console.log('Review submitted:', { name, rating, grade });

    // Reset the form fields after submission
    setName('');
    setRating('');
    setGrade('');
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grade:</label>
          {gradeOptions.map((option) => (
            <div key={option.label}>
              <input
                type="radio"
                id={option.label}
                name="grade"
                value={option.label}
                checked={grade === option.label}
                onChange={(e) => setGrade(e.target.value)}
              />
              <label htmlFor={option.label}>{option.label}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;