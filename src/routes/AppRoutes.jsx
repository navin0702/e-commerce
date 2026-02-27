import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';

// admin
import AdminLayout from '../components/admin/AdminLayout';
import AdminLogin from '../pages/Admin/Login';
import ProductList from '../pages/Admin/ProductList';
import AddProduct from '../pages/Admin/AddProduct';
import EditProduct from '../pages/Admin/EditProduct';

function AppRoutes() {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />

      {/* admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>  
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
