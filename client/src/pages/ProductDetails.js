import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Product.css';
import { Link } from 'react-router-dom';
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products', {
        params: { category, company },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleSearch = () => {
    fetchProducts();
  };
  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="input-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={handleCompanyChange}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>
      <div className="top-products-link">
        <Link to="/top-products">Top Products</Link>
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
