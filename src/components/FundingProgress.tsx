import React, { useState } from 'react';
import FundingUseCards from './funding/FundingUseCards';
import RedirectDialog from './funding/RedirectDialog';

const FundingProgress: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleInvestClick = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.open("https://wefunder.com/tableone", '_blank');
      setIsRedirecting(false);
    }, 1500);
  };
  
  return (
    <section id="invest" className="py-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium mb-4 animate-fade-in text-gradient-metallic tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            Invest in our Journey
          </h2>
          <p className="text-base md:text-lg text-[#8E8E93] max-w-2xl mx-auto animate-fade-in animate-delay-100 font-sfpro">
            We are raising this round on Wefunder via SAFEs with a $4mm post-money valuation cap.
          </p>
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={handleInvestClick}
            className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px] text-sm"
          >
            Invest via Wefunder
          </button>
          <p className="mt-3 text-white/60 text-xs">
            Minimum investment: $500
          </p>
        </div>
      </div>
      
      <RedirectDialog isOpen={isRedirecting} />
    </section>
  );
};

export default FundingProgress;
