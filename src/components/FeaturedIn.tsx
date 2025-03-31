
import React from 'react';
import { Newspaper, Tv, Video } from 'lucide-react';

const FeaturedIn: React.FC = () => {
  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium mb-8 text-[#8E8E93] font-sfpro">Featured In</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Forbes-style logo */}
            <div className="group flex flex-col items-center transition-all">
              <Newspaper size={28} className="text-white mb-2 group-hover:text-purple-400 transition-colors" />
              <p className="text-white font-bold tracking-tight text-xl group-hover:text-purple-400 transition-colors">FORBES</p>
            </div>
            
            {/* CNN-style logo */}
            <div className="group flex flex-col items-center transition-all">
              <Tv size={28} className="text-white mb-2 group-hover:text-purple-400 transition-colors" />
              <p className="text-white font-bold tracking-tight text-xl group-hover:text-purple-400 transition-colors">
                <span className="bg-red-600 px-2 py-1">CNN</span>
              </p>
            </div>
            
            {/* Bloomberg-style logo */}
            <div className="group flex flex-col items-center transition-all">
              <Video size={28} className="text-white mb-2 group-hover:text-purple-400 transition-colors" />
              <p className="text-white font-bold text-xl group-hover:text-purple-400 transition-colors">Bloomberg</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
