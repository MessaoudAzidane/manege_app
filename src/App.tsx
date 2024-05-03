import {Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductPage from './components/ProductList';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
    </Routes>
  );
};

export default App;