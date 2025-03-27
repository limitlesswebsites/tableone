
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
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
      scrolled ? 'glass backdrop-blur-lg bg-black/30' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-gradient">TableOne</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#metrics" className="text-sm text-white/80 hover:text-white transition-colors">Metrics</a>
          <a href="#roadmap" className="text-sm text-white/80 hover:text-white transition-colors">Roadmap</a>
          <a href="#forecast" className="text-sm text-white/80 hover:text-white transition-colors">Forecast</a>
          <a href="#expansion" className="text-sm text-white/80 hover:text-white transition-colors">Expansion</a>
        </div>
        <a 
          href="#invest" 
          className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
        >
          Invest Now
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
