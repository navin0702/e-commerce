import { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE_FROM_WISHLIST':
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_WISHLIST':
      return [];
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
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
