import React from "react";
import { useReviews } from "../contexts/ReviewContext";

const Reviews = ({ productId }) => {
  const { reviews } = useReviews();
  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-2">Reviews</h2>
      {productReviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        productReviews.map((review, index) => (
          <div key={index} className="border-2 border-black p-4 mb-2">
            <p className="font-bold">Rating: {review.rating}</p>
            <p>{review.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
