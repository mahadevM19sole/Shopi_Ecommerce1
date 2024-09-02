import React, { useState } from "react";
import { useReviews } from "../contexts/ReviewContext";

const ReviewForm = ({ productId }) => {
  const { addReview } = useReviews();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review && rating) {
      addReview(productId, { review, rating });
      setReview("");
      setRating(0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
    >
      <div className="mb-2">
        <label className="block text-gray-700">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border-2 border-black rounded p-2 w-full"
        >
          <option value={0} disabled>
            Select rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border-2 border-black rounded p-2 w-full"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="block md:inline-block bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-[#87acec] mt-2"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
