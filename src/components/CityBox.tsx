
import React from 'react';

export type CityStatus = 'Active' | 'Coming Soon' | 'Planned';

interface CityBoxProps {
  name: string;
  status: CityStatus;
  index: number;
}

const CityBox: React.FC<CityBoxProps> = ({ name, status, index }) => {
  const getBgClass = () => {
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-br from-green-900/30 to-green-600/30 border-green-500/30';
      case 'Coming Soon':
        return 'bg-gradient-to-br from-blue-900/30 to-blue-600/30 border-blue-500/30';
      default:
        return 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border-gray-500/30';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-300';
      case 'Coming Soon':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div 
      className={`city-box opacity-0 p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${getBgClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-2xl font-semibold mb-2">
        {name}
      </h3>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass()}`}>
        {status}
      </div>
    </div>
  );
};

export default CityBox;
