
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-20 pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="rounded-full glass px-4 py-1.5 mb-8 animate-fade-in">
            <span className="text-xs font-medium text-white/90">Raising $1M to Redefine Restaurant Reservations</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in tracking-tight">
            <span className="text-gradient-gold">Platinum Card Dining</span>
            <br />
            <span className="text-white">Without The Card</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl animate-fade-in animate-delay-100">
            TableOne is revolutionizing how diners access premium reservations through a subscription model that delivers exceptional value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-200">
            <a 
              href="#invest"
              className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
            >
              Invest Now
            </a>
            <a 
              href="#metrics"
              className="px-8 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
            >
              See Our Metrics
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-8 h-8 flex justify-center items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white/60"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
