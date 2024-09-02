import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
      } catch (error) {
        setError("Failed to fetch orders");
      }
    };
    getOrders();
  }, []);

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8 text-center">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 shadow-lg bg-white"
            >
              <h2 className="text-2xl font-bold mb-2">Order ID: {order.id}</h2>
              <p className="text-gray-600 mb-1">
                Total:{" "}
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Date:{" "}
                <span className="font-semibold">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
              <ul className="space-y-2">
                {order.products.map((product) => (
                  <li
                    key={product.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{product.title}</span>
                    <span className="font-semibold text-gray-900">
                      ${product.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
