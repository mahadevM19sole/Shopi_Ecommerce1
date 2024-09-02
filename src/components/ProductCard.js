import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = React.useState(false);

  // Function to truncate the product title
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the card click event
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="relative max-w-sm w-full border p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto">
      <Link to={`/product/${product.id}`}>
        {product.images && product.images.length > 0 && (
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <p className="absolute bottom-0 left-0 ml-2 mb-2 bg-gray-800 bg-opacity-75 text-white text-sm px-2 py-1 rounded-full">
              {product.category.name}
            </p>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mt-2 text-gray-800">
            {truncateTitle(product.title, 24)}
          </h2>
          <p className="text-lg text-gray-600">${product.price}</p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="block md:inline-block bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-[#87acec] mt-2"
      >
        ADD TO CART
      </button>
      {addedToCart && (
        <div className="mt-4 text-green-600">
          Product added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
