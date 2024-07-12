import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import TopProductsPage from './pages/TopProducts';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductDetails/>} />
                <Route path="/top-products" element={<TopProductsPage/>} />
            </Routes>
        </Router>
    );
};

export default App;
