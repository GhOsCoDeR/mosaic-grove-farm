
import React, { createContext, useReducer, ReactNode } from 'react';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variations?: {
    name: string;
    options: string[];
  }[];
  weight?: {
    options: number[];
    unit: string;
  };
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedVariation?: Record<string, string>;
  selectedWeight?: number;
};

type CartState = {
  cartItems: CartItem[];
  wishlistItems: Product[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedVariation?: Record<string, string>; selectedWeight?: number; } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number; selectedVariation?: Record<string, string>; selectedWeight?: number; } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number; selectedVariation?: Record<string, string>; selectedWeight?: number; } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number };

type CartContextType = {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product, quantity?: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => void;
  removeFromCart: (productId: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => void;
  updateQuantity: (productId: number, quantity: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

const initialState: CartState = {
  cartItems: [],
  wishlistItems: [],
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to check if two variations are the same
const areVariationsSame = (var1?: Record<string, string>, var2?: Record<string, string>): boolean => {
  if (!var1 && !var2) return true;
  if (!var1 || !var2) return false;

  const keys1 = Object.keys(var1);
  const keys2 = Object.keys(var2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => var1[key] === var2[key]);
};

// Generate a unique cart item key based on product ID, variation and weight
const getCartItemKey = (
  productId: number, 
  selectedVariation?: Record<string, string>, 
  selectedWeight?: number
): string => {
  const variationString = selectedVariation 
    ? Object.entries(selectedVariation)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}:${value}`)
        .join('|')
    : '';
  
  const weightString = selectedWeight ? String(selectedWeight) : '';
  
  return `${productId}-${variationString}-${weightString}`;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedVariation, selectedWeight } = action.payload;
      const cartKey = getCartItemKey(product.id, selectedVariation, selectedWeight);
      
      // Check if this exact product + variation + weight combination exists
      const existingItemIndex = state.cartItems.findIndex(item => 
        getCartItemKey(item.product.id, item.selectedVariation, item.selectedWeight) === cartKey
      );

      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + quantity,
        };
        return { ...state, cartItems: updatedCartItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product, quantity, selectedVariation, selectedWeight }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const { id, selectedVariation, selectedWeight } = action.payload;
      const cartKey = getCartItemKey(id, selectedVariation, selectedWeight);
      
      return {
        ...state,
        cartItems: state.cartItems.filter(item => 
          getCartItemKey(item.product.id, item.selectedVariation, item.selectedWeight) !== cartKey
        ),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity, selectedVariation, selectedWeight } = action.payload;
      const cartKey = getCartItemKey(id, selectedVariation, selectedWeight);
      
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => 
            getCartItemKey(item.product.i, item.selectedVariation, item.selectedWeight) !== cartKey
          ),
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          getCartItemKey(item.product.id, item.selectedVariation, item.selectedWeight) === cartKey
            ? { ...item, quantity } 
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    
    case 'ADD_TO_WISHLIST': {
      const isAlreadyInWishlist = state.wishlistItems.some(item => item.id === action.payload.id);
      if (isAlreadyInWishlist) {
        return state;
      }
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload),
      };
    
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, quantity = 1, selectedVariation?: Record<string, string>, selectedWeight?: number) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity, selectedVariation, selectedWeight } 
    });
  };

  const removeFromCart = (productId: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: { id: productId, selectedVariation, selectedWeight } 
    });
  };

  const updateQuantity = (productId: number, quantity: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity, selectedVariation, selectedWeight } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const isInWishlist = (productId: number) => {
    return state.wishlistItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
