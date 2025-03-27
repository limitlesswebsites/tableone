
import React, { useEffect, useState, useRef } from 'react';

// Fake static implementation since we don't have the real mapbox API
const CityMap: React.FC = () => {
  const cities = [
    { name: "Chicago", active: false },
    { name: "Boston", active: false },
    { name: "Washington DC", active: false },
    { name: "Dallas", active: false },
    { name: "Los Angeles", active: false },
    { name: "San Francisco", active: false },
    { name: "Philadelphia", active: false },
    { name: "London", active: false },
    { name: "New York", active: true }, // Current city
  ];
  
  const [activeCities, setActiveCities] = useState<{[key: string]: boolean}>({
    "New York": true,
  });
  
  const toggleCity = (cityName: string) => {
    setActiveCities(prev => ({
      ...prev,
      [cityName]: !prev[cityName]
    }));
  };
  
  return (
    <section id="expansion" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Expansion Strategy
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Strategic city selection for maximum growth and market penetration.
          </p>
        </div>
        
        <div className="glass-card p-6 md:p-8 relative overflow-hidden animate-fade-in animate-delay-200">
          {/* Simplified map visualization */}
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e1424] to-[#1e293b]">
              {/* World map outlines - simplified abstraction */}
              <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xODcgMTM4YzM2LTE5IDQzLTM1IDczLTM1czYwIDAgODkgMyA5OCAzNiA5OCAzNi0yOCAxNS0zOSAyM2MtMTEgOC0yOSAzMS01MyAzMS0yNCAwLTQ4LTExLTYwLTExcy00MCAyNS02NSAxOWMtMjUtNi0yNi0yNy0yNi0yN3M0Ny0yMCA3OC0zOWMzMS0xOSA0NS0yOCA3MC0yMCAyNSA3IDQyIDMgNTEtMTUgMTAtMTggMjctNyAyNyA1IDAgMTEtNCAxNy0xNyAyNi0xMyA5LTMwIDEzLTMwIDEzcy01MiAyOC04OSAzYy0zNy0yNC05MS0zNi0xMDctNy0xNiAyOC0zNSA1My02OSA1My0zMy0xLTU0LTI1LTU0LTI2czI5LTIgMjktMiAzMy0zIDU2LTI1YzIzLTIxIDI5LTE2IDI5LTE2bC00IDE1LTMyIDEyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0xMDMgMjcwYzU1LTEwIDk2LTMwIDEyOS00M3M0NC0xOSA0NC0xOWwyMSA1LTExIDE2IDE5IDEwLTI2IDIwIDE4IDExdjE4aC0xOWwtOSA3IDkgOC0yMCA5IDE1IDE0LTkgMTAgOCAxMC0yMiA5LTEwLTUtMTUgNy00MS0xMi0zOS0yMi00My00Mi0zOS00MSAxMCAxMCAxMC0yIDQ0IDQ5IDUyIDMyIDMzLTYgNi0yOSAxNy0xNHpNMjY3IDIxN3MxIDEzLTcgMTBjLTgtMy05LTEzLTE1LTEzLTctMS0xOC03LTI5IDRsLTggNyA1IDEwIDMgMTItMTEgNy00LTMtMTctMTJ2LTE1czQtMTEtMS0xOGMtNS02LTExLTgtNC0yMCA4LTExIDE5LTE0IDMwLTE2IDEyLTIgNTgtNDkgNTgtNDlzNiAxMCAwIDI4Yy02IDE4LTI2IDUxLTQxIDUyLTE1IDItMTcgMS0xOCAzcyEyIDggNiA5YzUgMSAxNy01IDI0LTQgNiAxIDE1IDQgOCA4LTggNC0xMS0yLTEzLTEtMyAwLTkgMiAwIDB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PC9nPjwvc3ZnPg==')]"></div>
              
              {/* Markers for cities */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Chicago"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Chicago</span>
                </div>
              </div>
              
              <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Boston"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Boston</span>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Washington DC"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Washington DC</span>
                </div>
              </div>
              
              <div className="absolute top-2/5 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Dallas"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Dallas</span>
                </div>
              </div>
              
              <div className="absolute top-2/5 left-1/6 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Los Angeles"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Los Angeles</span>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-1/7 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["San Francisco"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">San Francisco</span>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-7/10 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["Philadelphia"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Philadelphia</span>
                </div>
              </div>
              
              <div className="absolute top-1/4 right-1/6 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 rounded-full ${activeCities["London"] ? 'bg-blue-500 animate-pulse' : 'bg-white/30'}`}></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">London</span>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-7/12 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                <div className="absolute top-1 left-6 whitespace-nowrap">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">New York (Active)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city) => (
              <button
                key={city.name}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  activeCities[city.name] 
                    ? 'bg-gradient-to-r from-blue-600/80 to-blue-400/80 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
                onClick={() => toggleCity(city.name)}
              >
                {city.name}
              </button>
            ))}
          </div>
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
