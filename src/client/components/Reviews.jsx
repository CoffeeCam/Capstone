import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;