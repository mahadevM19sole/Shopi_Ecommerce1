import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import useDebounce from "../hooks/useDebounce";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const categoryProducts =
          category === "all"
            ? data
            : data.filter(
                (product) =>
                  product.category.name.toLowerCase() === category.toLowerCase()
              );
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        setError("Failed to fetch products");
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [debouncedSearchQuery, products]);

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </h1>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border p-4"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p>${product.price}</p>
            <p className="text-gray-600">{product.category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
