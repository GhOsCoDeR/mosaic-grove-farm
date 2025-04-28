import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Navbar component with updated background color
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const location = useLocation();

  // Check if current path matches the link
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 bg-mosaic-green-dark/90 backdrop-blur-sm text-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl md:text-2xl font-bold">
            Mosaic Grove
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/impact">Our Impact</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={isAuthenticated ? '/account' : '/login'} className="text-white hover:text-mosaic-earth transition-colors">
              <div className="flex items-center">
                <User size={20} />
                <span className="ml-1">{isAuthenticated ? 'Account' : 'Login'}</span>
              </div>
            </Link>
            
            <Link to="/wishlist" className="text-white hover:text-mosaic-earth transition-colors">
              <div className="flex items-center">
                <div className="relative">
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-mosaic-earth text-mosaic-green-dark text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <span className="ml-1">Wishlist</span>
              </div>
            </Link>
            
            <Link to="/cart">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-mosaic-green-dark transition-colors">
                <ShoppingCart size={18} className="mr-1" />
                <span>Cart ({cartItems.length})</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-mosaic-green-dark border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" mobile>Home</NavLink>
              <NavLink to="/products" mobile>Products</NavLink>
              <NavLink to="/about" mobile>About</NavLink>
              <NavLink to="/impact" mobile>Our Impact</NavLink>
              <NavLink to="/contact" mobile>Contact</NavLink>
              
              <div className="border-t border-white/10 pt-4 mt-2 flex flex-col space-y-4">
                <Link to={isAuthenticated ? '/account' : '/login'} className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>{isAuthenticated ? 'My Account' : 'Login / Register'}</span>
                </Link>
                
                <Link to="/wishlist" className="flex items-center">
                  <Heart size={18} className="mr-2" />
                  <span>Wishlist ({wishlistItems.length})</span>
                </Link>
                
                <Link to="/cart" className="flex items-center">
                  <ShoppingCart size={18} className="mr-2" />
                  <span>Cart ({cartItems.length})</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

// NavLink component with active state styling
const NavLink = ({ to, children, mobile = false }: { to: string; children: React.ReactNode; mobile?: boolean }) => {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={`
        ${mobile ? 'text-lg py-1' : 'text-sm font-medium'} 
        ${isActive 
          ? 'text-mosaic-earth font-medium' 
          : 'text-white hover:text-mosaic-earth'
        }
        transition-colors
      `}
    >
      {children}
    </Link>
  );
};

export default Navbar;
