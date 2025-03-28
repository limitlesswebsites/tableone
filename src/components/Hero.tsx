
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '0.2s' }}>
            <img 
              src="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png" 
              alt="TableOne Logo" 
              className="w-32 md:w-44 lg:w-52 mx-auto transition-all duration-500 hover:scale-105"
            />
          </div>
          
          <div className="rounded-full glass backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 mb-10 opacity-0 animate-[fadeIn_0.8s_ease_forwards] shadow-lg hover:bg-white/10 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
            <span className="text-xs font-medium text-white/90">Raising $100K to Redefine Restaurant Reservations</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards] tracking-tight leading-[1.1]" style={{ animationDelay: '0.6s' }}>
            <span className="platinum-text font-extrabold">Platinum Card Dining</span>
            <br />
            <span className="text-white"><span className="gold-text font-extrabold">Without</span> The Card</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl opacity-0 animate-[fadeIn_0.8s_ease_forwards] leading-relaxed" style={{ animationDelay: '0.8s' }}>
            TableOne is revolutionizing how diners access premium reservations through a subscription model that delivers exceptional value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '1s' }}>
            <Link 
              to="#invest"
              className="px-7 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 text-sm"
            >
              Invest Now
            </Link>
            <Link 
              to="#metrics"
              className="px-7 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm"
            >
              See Our Metrics
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle cursor-pointer">
        <Link to="#metrics" className="w-10 h-10 flex justify-center items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110">
          <ArrowDown size={16} className="text-white/60" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
