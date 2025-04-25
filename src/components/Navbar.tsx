
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-mosaic-green">Mosaic Grove</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-mosaic-green hover:text-mosaic-green-dark"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-mosaic-green-dark hover:text-mosaic-green font-medium">
              Home
            </Link>
            <Link to="/about" className="text-mosaic-green-dark hover:text-mosaic-green font-medium">
              About Us
            </Link>
            <Link to="/products" className="text-mosaic-green-dark hover:text-mosaic-green font-medium">
              Products
            </Link>
            <Link to="/impact" className="text-mosaic-green-dark hover:text-mosaic-green font-medium">
              Community Impact
            </Link>
            <Link to="/contact" className="text-mosaic-green-dark hover:text-mosaic-green font-medium">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-mosaic-green-dark hover:text-mosaic-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-mosaic-green-dark hover:text-mosaic-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                className="text-mosaic-green-dark hover:text-mosaic-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/impact" 
                className="text-mosaic-green-dark hover:text-mosaic-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Community Impact
              </Link>
              <Link 
                to="/contact" 
                className="text-mosaic-green-dark hover:text-mosaic-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
