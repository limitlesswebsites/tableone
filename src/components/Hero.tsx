
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-20 pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <img 
              src="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png" 
              alt="TableOne Logo" 
              className="w-40 md:w-56 lg:w-64 mx-auto"
            />
          </div>
          
          <div className="rounded-full glass backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 mb-10 animate-fade-in shadow-lg">
            <span className="text-xs font-medium text-white/90">Raising $100K to Redefine Restaurant Reservations</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in tracking-tight leading-[1.1]">
            <span className="text-gradient-gold">Platinum Card Dining</span>
            <br />
            <span className="text-white">Without The Card</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl animate-fade-in animate-delay-100 leading-relaxed">
            TableOne is revolutionizing how diners access premium reservations through a subscription model that delivers exceptional value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in animate-delay-200">
            <a 
              href="#invest"
              className="px-8 py-3.5 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px]"
            >
              Invest Now
            </a>
            <a 
              href="#metrics"
              className="px-8 py-3.5 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:translate-y-[-2px]"
            >
              See Our Metrics
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle cursor-pointer">
        <a href="#metrics" className="w-10 h-10 flex justify-center items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
          <ArrowDown size={18} className="text-white/60" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
