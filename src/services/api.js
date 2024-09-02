import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchReviews = async (productId) => {
  // Mock fetch reviews
  return [
    { rating: 5, review: "Great product!" },
    { rating: 4, review: "Very good quality." },
  ];
};

export const submitReview = async (productId, review) => {
  // Mock submit review
  return { ...review, productId };
};
