
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const CityMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  // City coordinates - [longitude, latitude]
  const cities = [
    { name: "New York", coordinates: [-74.0060, 40.7128], active: true },
    { name: "Chicago", coordinates: [-87.6298, 41.8781], active: false },
    { name: "Boston", coordinates: [-71.0589, 42.3601], active: false },
    { name: "Washington DC", coordinates: [-77.0369, 38.9072], active: false },
    { name: "Dallas", coordinates: [-96.7970, 32.7767], active: false },
    { name: "Los Angeles", coordinates: [-118.2437, 34.0522], active: false },
    { name: "San Francisco", coordinates: [-122.4194, 37.7749], active: false },
    { name: "Philadelphia", coordinates: [-75.1652, 39.9526], active: false },
    { name: "London", coordinates: [-0.1278, 51.5074], active: false },
  ];
  
  const [activeCities, setActiveCities] = useState<{[key: string]: boolean}>({
    "New York": true,
  });
  
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-95, 37], // Center on US
      zoom: 2,
      projection: 'globe',
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'bottom-right'
    );

    // Add markers for each city
    map.current.on('load', () => {
      // Add atmospheric styling
      map.current?.setFog({
        color: 'rgb(20, 20, 30)',
        'high-color': 'rgb(20, 20, 40)',
        'horizon-blend': 0.2,
      });
      
      // Add markers for each city
      cities.forEach(city => {
        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'city-marker';
        el.style.width = '15px';
        el.style.height = '15px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        
        if (city.name === "New York") {
          el.style.backgroundColor = '#10b981'; // Green for active city
          el.style.boxShadow = '0 0 10px 2px rgba(16, 185, 129, 0.7)';
        } else {
          el.style.backgroundColor = activeCities[city.name] ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)';
          el.style.boxShadow = activeCities[city.name] ? '0 0 10px 2px rgba(59, 130, 246, 0.5)' : 'none';
        }
        
        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`<div class="bg-black/80 px-2 py-1 rounded text-white text-xs">${city.name}${city.name === "New York" ? ' (Active)' : ''}</div>`);
            
        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(city.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };
  
  const toggleCity = (cityName: string) => {
    setActiveCities(prev => ({
      ...prev,
      [cityName]: !prev[cityName]
    }));
    
    // Update marker color when city is toggled
    if (map.current) {
      const markers = document.querySelectorAll('.city-marker');
      const cityIndex = cities.findIndex(c => c.name === cityName);
      
      if (cityIndex >= 0 && cityIndex < markers.length) {
        const marker = markers[cityIndex] as HTMLDivElement;
        const isActive = !activeCities[cityName];
        
        if (cityName !== "New York") {
          marker.style.backgroundColor = isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)';
          marker.style.boxShadow = isActive ? '0 0 10px 2px rgba(59, 130, 246, 0.5)' : 'none';
        }
      }
    }
  };
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setShowTokenInput(false);
      initializeMap();
    }
  };
  
  useEffect(() => {
    // Try to initialize map when component mounts
    if (mapboxToken) {
      initializeMap();
    }
    
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);
  
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
          {showTokenInput ? (
            <div className="max-w-md mx-auto py-10">
              <div className="mb-4 text-center">
                <p className="text-white/80 mb-4">To view the interactive map, please enter your Mapbox public token:</p>
                <p className="text-xs text-white/60 mb-6">You can get a free token by signing up at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">mapbox.com</a></p>
              </div>
              <form onSubmit={handleTokenSubmit} className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="Enter Mapbox public token"
                  className="px-4 py-2 rounded-md bg-black/30 border border-white/20 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
                >
                  Initialize Map
                </button>
              </form>
            </div>
          ) : (
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
              <div ref={mapContainer} className="absolute inset-0" />
            </div>
          )}
          
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city) => (
              <button
                key={city.name}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  city.name === "New York"
                    ? 'bg-gradient-to-r from-green-600/80 to-green-400/80 text-white cursor-default'
                    : activeCities[city.name] 
                      ? 'bg-gradient-to-r from-blue-600/80 to-blue-400/80 text-white' 
                      : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
                onClick={() => city.name !== "New York" && toggleCity(city.name)}
                disabled={city.name === "New York"}
              >
                {city.name}
                {city.name === "New York" && " (Active)"}
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
