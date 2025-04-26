
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { isSameProduct } from '../utils/productHelpers';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  // Add helper function to properly compare product IDs regardless of type
  const originalContext = { ...context };
  
  // Enhanced context with type-safe methods
  return {
    ...originalContext,
    isInCart: (productId: string | number) => 
      originalContext.cartItems.some(item => isSameProduct(item.product.id, productId)),
    isInWishlist: (productId: string | number) => 
      originalContext.wishlistItems.some(item => isSameProduct(item.id, productId))
  };
};
