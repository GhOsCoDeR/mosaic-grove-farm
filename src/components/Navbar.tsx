
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-mosaic-green">Mosaic Grove</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-mosaic-green hover:text-mosaic-green-dark transition-colors duration-300" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-mosaic-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-mosaic-green hover:text-mosaic-green-dark"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 hover:text-mosaic-green ${
                isActive('/') 
                  ? 'text-mosaic-green border-b-2 border-mosaic-green' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-all duration-300 hover:text-mosaic-green ${
                isActive('/about') 
                  ? 'text-mosaic-green border-b-2 border-mosaic-green' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-all duration-300 hover:text-mosaic-green ${
                isActive('/products') 
                  ? 'text-mosaic-green border-b-2 border-mosaic-green' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/impact" 
              className={`font-medium transition-all duration-300 hover:text-mosaic-green ${
                isActive('/impact') 
                  ? 'text-mosaic-green border-b-2 border-mosaic-green' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Community Impact
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-all duration-300 hover:text-mosaic-green ${
                isActive('/contact') 
                  ? 'text-mosaic-green border-b-2 border-mosaic-green' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Contact
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-mosaic-green hover:text-mosaic-green-dark transition-colors duration-300" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-mosaic-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-in-right">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium ${
                  isActive('/') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-medium ${
                  isActive('/about') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                className={`font-medium ${
                  isActive('/products') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/impact" 
                className={`font-medium ${
                  isActive('/impact') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community Impact
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium ${
                  isActive('/contact') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/cart" 
                className={`font-medium ${
                  isActive('/cart') 
                    ? 'text-mosaic-green' 
                    : 'text-mosaic-green-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
