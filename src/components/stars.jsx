// StarRating.js

import React from 'react';

const StarRating = ({ rating }) => {
  const starsTotal = 5;
  const starPercentage = (rating / starsTotal) * 100;

  const starIcons = [];
  for (let i = 0; i < starsTotal; i++) {
    if (i + 1 <= rating) {
      starIcons.push(<span key={i} className="star-icon filled">&#9733;</span>);
    } else if (i < rating && rating < i + 1) {
      starIcons.push(<span key={i} className="star-icon half-filled">&#9733;</span>);
    } else {
      starIcons.push(<span key={i} className="star-icon">&#9734;</span>);
    }
  }

  return (
    <div className="star-rating">
      {starIcons}
    </div>
  );
};

export default StarRating;
