
import React, { useRef, useEffect, useState } from 'react';
import CityBox from './CityBox';
import { cities } from '../data/cityData';

const CITIES_PER_PAGE = 9; // Show only 9 cities at a time

const CityMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate displayed cities
  const displayedCities = cities.slice(0, CITIES_PER_PAGE);
  const remainingCount = cities.length - CITIES_PER_PAGE;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation classes and remove opacity-0
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            
            // Add the glow effect from the data attribute
            const glowClass = entry.target.getAttribute('data-glow-class');
            if (glowClass) {
              setTimeout(() => {
                entry.target.classList.add(glowClass);
              }, 300); // Add glow after fade-in starts
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    if (containerRef.current) {
      const boxes = containerRef.current.querySelectorAll('.city-box');
      boxes.forEach((box) => {
        observer.observe(box);
      });
    }
    
    return () => {
      if (containerRef.current) {
        const boxes = containerRef.current.querySelectorAll('.city-box');
        boxes.forEach((box) => {
          observer.unobserve(box);
        });
      }
    };
  }, []);
  
  return (
    <section id="expansion" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/3 w-1/4 h-1/4 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Where to Next?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Strategic city selection for maximum growth and market penetration.
          </p>
        </div>
        
        <div ref={containerRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCities.map((city, index) => (
            <CityBox 
              key={city.name}
              name={city.name}
              status={city.status}
              index={index}
            />
          ))}
        </div>
        
        {/* Simple "+10 more" indicator */}
        {remainingCount > 0 && (
          <div className="mt-8 text-center animate-fade-in animate-delay-200">
            <p className="text-lg text-white/70 font-medium">+{remainingCount} more</p>
          </div>
        )}
        
        <div className="mt-10 text-center text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-300">
          <p>
            Our expansion strategy targets high-density urban areas with established dining scenes and affluent customer bases who value premium dining experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityMap;
