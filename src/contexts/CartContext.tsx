
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
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number };

type CartContextType = {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product, quantity?: number, selectedVariation?: Record<string, string>, selectedWeight?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
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

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedVariation, selectedWeight } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedVariation) === JSON.stringify(selectedVariation) &&
        item.selectedWeight === selectedWeight
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
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product.id !== id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.id === id ? { ...item, quantity } : item
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
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, selectedVariation, selectedWeight } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
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
