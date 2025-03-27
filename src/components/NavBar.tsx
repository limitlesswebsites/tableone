
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-500 ${
      scrolled ? 'glass backdrop-blur-lg bg-black/30 border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png" 
            alt="TableOne Logo" 
            className="h-5 md:h-6 transition-all duration-300 hover:opacity-80" 
          />
        </div>
        <div className="hidden md:flex space-x-14">
          <Link to="#metrics" className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1">
            Metrics
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="#roadmap" className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1">
            Roadmap
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="#forecast" className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1">
            Forecast
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="#expansion" className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1">
            Expansion
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <Link 
          to="#invest" 
          className="px-5 py-2 text-xs md:text-sm rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
        >
          Invest Now
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
