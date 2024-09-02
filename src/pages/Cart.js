import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const userConfirmed = window.confirm("Confirm your order");
    if (userConfirmed) {
      const order = {
        id: Date.now(), // Use current timestamp as a unique ID
        total: cart.reduce((sum, product) => sum + product.price, 0),
        date: new Date().toISOString(),
        products: cart,
      };

      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      savedOrders.push(order);
      localStorage.setItem("orders", JSON.stringify(savedOrders));

      clearCart();
      navigate("/MyOrders");
    }
  };

  return (
    <div className="container mt-4 px-4">
      {cart.length === 0 ? (
        <h1 className="flex justify-center text-black">Your cart is empty</h1>
      ) : (
        <div>
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center border-2 rounded-lg p-4 mb-4 max-w-md mx-auto shadow-lg"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-24 h-24 object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-gray-700">{product.category.name}</p>
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 inline-block hover:bg-green-600 rounded-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
