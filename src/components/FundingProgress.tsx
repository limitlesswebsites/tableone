
import React from 'react';
import CountUp from './CountUp';

const FundingProgress: React.FC = () => {
  const raisedAmount = 45000; // $45,000 raised so far
  const targetAmount = 100000; // $100,000 target
  const progressPercentage = (raisedAmount / targetAmount) * 100;
  
  return (
    <section id="invest" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Join Our Growth Journey
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Help us transform the dining reservation experience and be part of our success.
          </p>
        </div>
        
        <div className="glass-card p-8 max-w-3xl mx-auto animate-fade-in animate-delay-200">
          <div className="text-center mb-8">
            <div className="text-white/60 text-sm font-medium mb-2">Funding Progress</div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold">
                $<CountUp end={raisedAmount} />
              </span>
              <span className="text-white/60">
                $<CountUp end={targetAmount} />
              </span>
            </div>
            
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shimmer"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="mt-3 text-right">
              <span className="text-white/60 text-sm">
                <CountUp end={progressPercentage} decimals={1} suffix="%" /> of goal
              </span>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-6">How We'll Use The Funds</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                </div>
                <h4 className="font-medium mb-2">Team Expansion</h4>
                <p className="text-sm text-white/70">Hire one Engineer and one Brand Lead to accelerate growth and product development.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <h4 className="font-medium mb-2">Strategic Initiatives</h4>
                <p className="text-sm text-white/70">Invest in TableOne Plus One, Supergood, and Paid Ad Strategy to drive growth.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <h4 className="font-medium mb-2">Infrastructure</h4>
                <p className="text-sm text-white/70">Upgrade current infrastructure to enable eventual multi-city expansion.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="#" 
              className="inline-block px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
            >
              Invest Now
            </a>
            <p className="mt-4 text-white/60 text-sm">
              Minimum investment: $1,000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingProgress;
