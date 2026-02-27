import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from MongoDB when user changes
  useEffect(() => {
    if (user?._id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/cart/${user._id}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!user?._id) return;
    try {
      const payload = {
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] || product.image || '',
      };
      const res = await axios.post(`/api/cart/${user._id}`, payload);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user?._id) return;
    try {
      const res = await axios.delete(`/api/cart/${user._id}/${itemId}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Remove from cart error:', err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user?._id || quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    try {
      const item = cart.find((i) => i._id === itemId);
      if (!item) return;

      const res = await axios.post(`/api/cart/${user._id}`, {
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: Math.max(1, quantity),
        image: item.image,
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Update quantity error:', err);
    }
  };

  const clearCart = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.delete(`/api/cart/${user._id}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Clear cart error:', err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
