
import React from 'react';

const FundingUseCards: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <h3 className="text-xl font-semibold mb-6">How We'll Use The Funds</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
          </div>
          <h4 className="font-medium text-base mb-2 text-white">Team Expansion</h4>
          <p className="text-xs text-white/70 leading-relaxed">Hire one Engineer and one Brand Lead to accelerate growth and product development.</p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <h4 className="font-medium text-base mb-2 text-white">Strategic Initiatives</h4>
          <p className="text-xs text-white/70 leading-relaxed">Invest in TableOne Plus One, Supergood, and Paid Ad Strategy to drive growth.</p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <h4 className="font-medium text-base mb-2 text-white">Infrastructure</h4>
          <p className="text-xs text-white/70 leading-relaxed">Upgrade current infrastructure to enable eventual multi-city expansion.</p>
        </div>
      </div>
    </div>
  );
};

export default FundingUseCards;
