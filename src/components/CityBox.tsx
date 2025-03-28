
import React from 'react';

export type CityStatus = 'Active' | 'Coming Soon' | 'Planned';

interface CityBoxProps {
  name: string;
  status: CityStatus;
  index: number;
}

const CityBox: React.FC<CityBoxProps> = ({ name, status, index }) => {
  const getBgClass = () => {
    // Special case for New York to use #F2C498 color
    if (name === 'New York') {
      return 'bg-gradient-to-br from-[#F2C498]/30 to-[#F2C498]/20 border-[#F2C498]/30 hover:shadow-[0_0_15px_rgba(242,196,152,0.5)]';
    }
    
    // Special case for Chicago, Boston, and Washington DC to use #6633ff color
    if (name === 'Chicago' || name === 'Boston' || name === 'Washington DC') {
      return 'bg-gradient-to-br from-[#6633ff]/30 to-[#6633ff]/20 border-[#6633ff]/30 hover:shadow-[0_0_15px_rgba(102,51,255,0.5)]';
    }
    
    // Default colors based on status
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-br from-green-900/30 to-green-600/30 border-green-500/30 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]';
      case 'Coming Soon':
        return 'bg-gradient-to-br from-blue-900/30 to-blue-600/30 border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]';
      default:
        return 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border-gray-500/30 hover:shadow-[0_0_15px_rgba(156,163,175,0.3)]';
    }
  };

  const getStatusClass = () => {
    // Special cases for New York 
    if (name === 'New York') {
      return 'bg-[#F2C498]/20 text-[#F2C498]';
    }
    
    // Special cases for Chicago, Boston, and Washington DC
    if (name === 'Chicago' || name === 'Boston' || name === 'Washington DC') {
      return 'bg-[#6633ff]/20 text-[#6633ff]';
    }
    
    // Default status colors
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-300';
      case 'Coming Soon':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getGlowClass = () => {
    // Special cases for New York
    if (name === 'New York') {
      return 'shadow-[0_0_20px_rgba(242,196,152,0.4)]';
    }
    
    // Special cases for Chicago, Boston, and Washington DC
    if (name === 'Chicago' || name === 'Boston' || name === 'Washington DC') {
      return 'shadow-[0_0_20px_rgba(102,51,255,0.4)]';
    }
    
    // Default glow colors
    switch (status) {
      case 'Active':
        return 'shadow-[0_0_20px_rgba(74,222,128,0.4)]';
      case 'Coming Soon':
        return 'shadow-[0_0_20px_rgba(59,130,246,0.4)]';
      default:
        return 'shadow-[0_0_15px_rgba(156,163,175,0.2)]';
    }
  };

  return (
    <div 
      className={`city-box opacity-0 p-5 rounded-2xl backdrop-blur-xl border transition-all duration-500 transform hover:scale-105 ${getBgClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-glow-class={getGlowClass()}
    >
      <h3 className="text-lg font-semibold mb-2 text-white">
        {name}
      </h3>
      <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass()}`}>
        {status}
      </div>
    </div>
  );
};

export default CityBox;
