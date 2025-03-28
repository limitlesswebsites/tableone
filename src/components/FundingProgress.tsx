
import React, { useState } from 'react';
import CountUp from './CountUp';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

const FundingProgress: React.FC = () => {
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const raisedAmount = 28000; // $28,000 raised so far
  const interestedAmount = 72000; // $72,000 interest expressed
  const targetAmount = 1000000; // $1,000,000 target
  
  const committedPercentage = (raisedAmount / targetAmount) * 100;
  const interestedPercentage = (interestedAmount / targetAmount) * 100;
  const totalPercentage = committedPercentage + interestedPercentage;
  
  const handleSubmitInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(investmentAmount);
    
    if (amount < 1000) {
      toast({
        title: "Minimum investment required",
        description: "Please enter a minimum investment of $1,000",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Interest registered",
      description: `Thank you for your interest in investing $${amount.toLocaleString()}!`,
      variant: "default"
    });
    
    setIsInvestmentDialogOpen(false);
    setInvestmentAmount('');
    setEmail('');
  };
  
  return (
    <section id="invest" className="py-16 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 animate-fade-in tracking-tight">
            Join Our Growth Journey
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Help us transform the dining reservation experience and be part of our success.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto animate-fade-in animate-delay-200 shadow-xl">
          <div className="text-center mb-10">
            <div className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Funding Progress</div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold text-lg">
                $<CountUp end={raisedAmount} />
              </span>
              <span className="text-white/60 text-lg">
                $<CountUp end={targetAmount} />
              </span>
            </div>
            
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full flex">
                {/* Committed amount (green) */}
                <div 
                  className="h-full transition-all duration-1000 ease-out shimmer"
                  style={{ width: `${committedPercentage}%`, backgroundColor: '#05d9a7' }}
                ></div>
                {/* Interested amount (yellow/gold) */}
                <div 
                  className="h-full transition-all duration-1000 ease-out shimmer"
                  style={{ width: `${interestedPercentage}%`, backgroundColor: '#fab100' }}
                ></div>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center text-xs text-white/60">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#05d9a7] mr-2"></span>
                <span>Committed: $<CountUp end={raisedAmount} /> (<CountUp end={committedPercentage} decimals={1} suffix="%" />)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#fab100] mr-2"></span>
                <span>Interested: $<CountUp end={interestedAmount} /> (<CountUp end={interestedPercentage} decimals={1} suffix="%" />)</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold mb-6">How We'll Use The Funds</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                </div>
                <h4 className="font-medium text-base mb-2">Team Expansion</h4>
                <p className="text-xs text-white/70 leading-relaxed">Hire one Engineer and one Brand Lead to accelerate growth and product development.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <h4 className="font-medium text-base mb-2">Strategic Initiatives</h4>
                <p className="text-xs text-white/70 leading-relaxed">Invest in TableOne Plus One, Supergood, and Paid Ad Strategy to drive growth.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-500 border border-white/5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <h4 className="font-medium text-base mb-2">Infrastructure</h4>
                <p className="text-xs text-white/70 leading-relaxed">Upgrade current infrastructure to enable eventual multi-city expansion.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setIsInvestmentDialogOpen(true)}
              className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px] text-sm"
            >
              Invest Now
            </button>
            <p className="mt-3 text-white/60 text-xs">
              Minimum investment: $1,000
            </p>
          </div>
        </div>
      </div>

      {/* Investment Dialog */}
      <Dialog open={isInvestmentDialogOpen} onOpenChange={setIsInvestmentDialogOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-black/80 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-center mb-2 gradient-heading">Express Your Interest</DialogTitle>
            <DialogDescription className="text-white/70 text-center">
              Let us know how much you're interested in investing in TableOne's future.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitInterest} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-white/80">
                Investment Amount ($)
              </label>
              <Input
                id="investment-amount"
                type="number"
                min="1000"
                step="1000"
                placeholder="Minimum $1,000"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-4 flex justify-center">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                Register Interest
              </Button>
            </div>
            
            <p className="text-xs text-white/50 text-center">
              This is a non-binding expression of interest. We'll contact you with more details.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FundingProgress;
