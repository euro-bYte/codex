import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from "@tanstack/react-router";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold tracking-tight">InsurCompare</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <a href="#home" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
            </Link>
            <a href="#share" className="text-gray-900 hover:text-blue-600 font-medium">Share Your Rate</a>
            <a href="#explore" className="text-gray-900 hover:text-blue-600 font-medium">Explore Rates</a>
            <a href="#about" className="text-gray-900 hover:text-blue-600 font-medium">About</a>
            <Button>Get Started</Button>
            <Link to="/home">
              <Button variant="outline">
                Login
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-gray-900 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#share" 
                className="text-gray-900 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Share Your Rate
              </a>
              <a 
                href="#explore" 
                className="text-gray-900 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Rates
              </a>
              <a 
                href="#about" 
                className="text-gray-900 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <Button>Get Started</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;