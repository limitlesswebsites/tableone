import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import InvestmentDialog from './funding/InvestmentDialog';
import RedirectDialog from './funding/RedirectDialog';

const Hero: React.FC = () => {
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleDownloadClick = () => {
    window.open("https://apps.apple.com/us/app/tableone-reservations/id6448799631", '_blank');
  };

  const handleBubbleClick = () => {
    window.open("https://wefunder.com/tableone", '_blank');
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-20">
      <InvestmentDialog
        isOpen={isInvestmentDialogOpen}
        onOpenChange={setIsInvestmentDialogOpen}
        setIsOpen={setIsInvestmentDialogOpen}
      />
      
      <RedirectDialog isOpen={isRedirecting} />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-orange-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div 
            onClick={handleBubbleClick}
            className="rounded-full glass backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 mb-10 opacity-0 animate-[fadeIn_0.8s_ease_forwards] shadow-lg hover:bg-white/10 transition-all duration-300 cursor-pointer" 
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-xs font-medium text-white/90 font-sfpro tracking-wide">Accepting Investment from Our Community to Continue Redefining Restaurant Reservations</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium mb-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards] leading-[1.1] font-sfpro text-gradient-metallic" style={{ animationDelay: '0.6s', letterSpacing: '-0.5px' }}>
            The most powerful reservation experience, ever.
          </h1>

          <p className="text-base text-white/60 mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards] font-sfpro" style={{ animationDelay: '0.65s' }}>
            TableOne is the fastest, most intelligent way to book hard-to-get reservations across every platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={handleDownloadClick}
              className="px-7 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 text-sm font-sfpro"
            >
              Download now
            </button>
          </div>

          <div className="w-full max-w-2xl mb-12 opacity-0 animate-[fadeIn_0.8s_ease_forwards] relative" style={{ animationDelay: '0.8s' }}>
            <img
              src="/lovable-uploads/ec42b777-6399-401b-9c0d-fb195ba7d0a9.png"
              alt="TableOne New York Cityscape with Restaurant Locations"
              className="w-full h-auto drop-shadow-2xl relative z-0"
            />
          </div>

          {/* Small hovering image positioned below the city image with more spacing */}
          <div className="w-32 h-auto mb-8 opacity-0 animate-[fadeIn_0.8s_ease_forwards] relative z-20" style={{ animationDelay: '0.85s' }}>
            <img
              src="/lovable-uploads/67949c4b-6a63-4992-89f8-592289198aef.png"
              alt="TableOne hovering element"
              className="w-full h-auto drop-shadow-lg"
            />
          </div>

          <div className="mt-12 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '1.2s' }}>
            <HashLink smooth to="#videoStory" className="w-10 h-10 flex justify-center items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110 animate-bounce-subtle">
              <ArrowDown size={16} className="text-white/60" />
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
