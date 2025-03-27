
import React, { useState, useEffect } from 'react';

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
            className="h-5 md:h-6" 
          />
        </div>
        <div className="hidden md:flex space-x-10">
          <a href="#metrics" className="text-sm text-white/80 hover:text-white transition-colors relative group">
            Metrics
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#roadmap" className="text-sm text-white/80 hover:text-white transition-colors relative group">
            Roadmap
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#forecast" className="text-sm text-white/80 hover:text-white transition-colors relative group">
            Forecast
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#expansion" className="text-sm text-white/80 hover:text-white transition-colors relative group">
            Expansion
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <a 
          href="#invest" 
          className="px-3 py-1.5 text-xs md:px-4 md:py-1.5 md:text-sm rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
        >
          Invest Now
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
