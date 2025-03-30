
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
          <div className="rounded-full glass backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 mb-10 opacity-0 animate-[fadeIn_0.8s_ease_forwards] shadow-lg hover:bg-white/10 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
            <span className="text-xs font-medium text-white/90 font-inter">Raising $1M from Our Community to Continue Redefining Restaurant Reservations</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards] leading-[1.3] font-reemkufi uppercase" style={{ animationDelay: '0.6s', letterSpacing: '8px' }}>
            <span className="gradient-heading">PLATINUM CARD DINING,</span>
            <br />
            <span className="text-white"><span className="gradient-heading">WITHOUT</span> <span className="platinum-text font-extrabold font-reemkufi">THE CARD</span></span>
          </h1>
          
          <div className="w-full max-w-md mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards] relative" style={{ animationDelay: '0.7s' }}>
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/90 to-transparent z-10"></div>
            <img 
              src="/lovable-uploads/7c1bebd2-b8d9-4083-befc-a934acd41656.png" 
              alt="TableOne App with Premium Cards" 
              className="w-full h-auto drop-shadow-2xl relative z-0" 
            />
          </div>
          
          <p className="text-base md:text-lg text-white/80 mb-12 max-w-3xl opacity-0 animate-[fadeIn_0.8s_ease_forwards] leading-relaxed gradient-subheading font-inter" style={{ animationDelay: '0.8s' }}>
            TableOne has revolutionized how diners access premium reservations through a subscription model that delivers exceptional value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '1s' }}>
            <Link 
              to="#invest"
              className="px-7 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 text-sm font-inter"
            >
              Invest Now
            </Link>
            <Link 
              to="#metrics"
              className="px-7 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm font-inter"
            >
              See Our Metrics
            </Link>
          </div>
          
          <div className="mt-12 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '1.2s' }}>
            <Link to="#metrics" className="w-10 h-10 flex justify-center items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110 animate-bounce-subtle">
              <ArrowDown size={16} className="text-white/60" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
