import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist from MongoDB when user changes
  useEffect(() => {
    if (user?._id) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/wishlist/${user._id}`);
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    if (!user?._id) return;
    try {
      const payload = {
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || '',
      };
      const res = await axios.post(`/api/wishlist/${user._id}`, payload);
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error('Add to wishlist error:', err);
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (!user?._id) return;
    try {
      const res = await axios.delete(`/api/wishlist/${user._id}/${itemId}`);
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error('Remove from wishlist error:', err);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId || item.productId?._id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
