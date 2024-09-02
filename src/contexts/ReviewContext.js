import React, { createContext, useState, useContext, useEffect } from "react";

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);
  }, []);

  const saveReviews = (reviews) => {
    setReviews(reviews);
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const addReview = (productId, review) => {
    const updatedReviews = [...reviews, { productId, ...review }];
    saveReviews(updatedReviews);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
