
import React, { createContext, useReducer, ReactNode } from 'react';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  cartItems: [],
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(
        item => item.product.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1,
        };
        return { ...state, cartItems: updatedCartItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product: action.payload, quantity: 1 }],
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
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
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

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
