
import React, { useRef, useEffect } from 'react';

const CityMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // City data
  const cities = [
    { name: "New York", status: "Active" },
    { name: "Chicago", status: "Coming Soon" },
    { name: "Boston", status: "Coming Soon" },
    { name: "Washington DC", status: "Coming Soon" },
    { name: "Dallas", status: "Planned" },
    { name: "Los Angeles", status: "Planned" },
    { name: "San Francisco", status: "Planned" },
    { name: "Philadelphia", status: "Planned" },
    { name: "London", status: "Planned" },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
            <div 
              key={city.name}
              className={`city-box opacity-0 p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                city.status === 'Active' 
                  ? 'bg-gradient-to-br from-green-900/30 to-green-600/30 border-green-500/30' 
                  : city.status === 'Coming Soon'
                    ? 'bg-gradient-to-br from-blue-900/30 to-blue-600/30 border-blue-500/30'
                    : 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border-gray-500/30'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold mb-2">
                {city.name}
              </h3>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                city.status === 'Active' 
                  ? 'bg-green-500/20 text-green-300' 
                  : city.status === 'Coming Soon'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-500/20 text-gray-300'
              }`}>
                {city.status}
              </div>
            </div>
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
