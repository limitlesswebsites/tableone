
import React, { useRef, useEffect } from 'react';
import CityBox from './CityBox';
import { cities } from '../data/cityData';

const CityMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add more prominent animation classes
            entry.target.classList.add('animate-fade-in', 'animate-pulse-glow');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
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
          {cities.map((city, index) => (
            <CityBox 
              key={city.name}
              name={city.name}
              status={city.status}
              index={index}
            />
          ))}
        </div>
        
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
