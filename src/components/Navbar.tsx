import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { isAuthenticated, user, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Get total items in cart
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Check if current path matches the link
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Check if path is admin route to hide navbar
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-mosaic-green-dark">
            Mosaic Grove
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-mosaic-green relative ${
                isActive('/') 
                  ? 'text-mosaic-green after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-mosaic-green after:bottom-0 after:left-0 after:mt-1' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-mosaic-green relative ${
                isActive('/about') 
                  ? 'text-mosaic-green after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-mosaic-green after:bottom-0 after:left-0 after:mt-1' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              About
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors hover:text-mosaic-green relative ${
                isActive('/products') 
                  ? 'text-mosaic-green after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-mosaic-green after:bottom-0 after:left-0 after:mt-1' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/impact" 
              className={`text-sm font-medium transition-colors hover:text-mosaic-green relative ${
                isActive('/impact') 
                  ? 'text-mosaic-green after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-mosaic-green after:bottom-0 after:left-0 after:mt-1' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Impact
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-mosaic-green relative ${
                isActive('/contact') 
                  ? 'text-mosaic-green after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-mosaic-green after:bottom-0 after:left-0 after:mt-1' 
                  : 'text-mosaic-green-dark'
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-mosaic-green-dark">
                  Hello, {displayName.split(' ')[0]}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green-light"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-mosaic-green-dark hover:text-mosaic-green flex items-center gap-1"
                >
                  <User size={18} /> Login
                </Button>
              </Link>
            )}
            
            <Link to="/wishlist" className="relative text-mosaic-green-dark hover:text-mosaic-green transition-colors">
              <Heart size={22} />
            </Link>
            
            <Link to="/cart" className="relative text-mosaic-green-dark hover:text-mosaic-green transition-colors cart-icon">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mosaic-green text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/wishlist" className="relative text-mosaic-green-dark hover:text-mosaic-green transition-colors">
              <Heart size={22} />
            </Link>
            
            <Link to="/cart" className="relative text-mosaic-green-dark hover:text-mosaic-green transition-colors cart-icon">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mosaic-green text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className="text-mosaic-green-dark hover:text-mosaic-green focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-slide-in-right shadow-lg">
          <nav className="container mx-auto px-4 py-6 flex flex-col">
            <Link 
              to="/" 
              onClick={closeMenu}
              className={`py-3 text-center text-lg font-medium ${
                isActive('/') ? 'text-mosaic-green' : 'text-mosaic-green-dark'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={closeMenu}
              className={`py-3 text-center text-lg font-medium ${
                isActive('/about') ? 'text-mosaic-green' : 'text-mosaic-green-dark'
              }`}
            >
              About
            </Link>
            <Link 
              to="/products" 
              onClick={closeMenu}
              className={`py-3 text-center text-lg font-medium ${
                isActive('/products') ? 'text-mosaic-green' : 'text-mosaic-green-dark'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/impact" 
              onClick={closeMenu}
              className={`py-3 text-center text-lg font-medium ${
                isActive('/impact') ? 'text-mosaic-green' : 'text-mosaic-green-dark'
              }`}
            >
              Impact
            </Link>
            <Link 
              to="/contact" 
              onClick={closeMenu}
              className={`py-3 text-center text-lg font-medium ${
                isActive('/contact') ? 'text-mosaic-green' : 'text-mosaic-green-dark'
              }`}
            >
              Contact
            </Link>
            
            <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col items-center">
              {isAuthenticated ? (
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="text-sm text-mosaic-green-dark">
                    Hello, {displayName.split(' ')[0]}
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green-light w-full"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="w-full" onClick={closeMenu}>
                  <Button 
                    variant="ghost" 
                    className="text-mosaic-green-dark hover:text-mosaic-green w-full flex items-center justify-center gap-1"
                  >
                    <User size={18} /> Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
