import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/TopProduct.css';
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products', {
        params: { category, minPrice, maxPrice },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleSearch = () => {
    fetchProducts();
  };
  return (
    <div className="container">
      <h1>Product List</h1>
      <div>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Discount</th>
            <th>Availability</th>
            <th>Company</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.rating}</td>
              <td>{product.discount}%</td>
              <td>{product.availability}</td>
              <td>{product.company.name}</td>
              <td>{product.categories.map(cat => cat.categoryName).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
