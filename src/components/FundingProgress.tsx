
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import FundingProgressBar from './funding/FundingProgressBar';
import FundingUseCards from './funding/FundingUseCards';
import InvestmentDialog from './funding/InvestmentDialog';
import { supabase } from '@/integrations/supabase/client';

const FundingProgress: React.FC = () => {
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const raisedAmount = 20000; // $20,000 raised so far
  const interestedAmount = 18000; // $18,000 interest expressed
  const targetAmount = 100000; // $100,000 target
  
  const committedPercentage = (raisedAmount / targetAmount) * 100;
  const interestedPercentage = (interestedAmount / targetAmount) * 100;
  
  const handleSubmitInterest = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('investment_interests')
        .insert({
          email: email,
          investment_amount: amount
        });

      if (error) {
        console.error('Error saving investment interest:', error);
        throw error;
      }

      toast({
        title: "Interest registered",
        description: `Thank you for your interest in investing $${amount.toLocaleString()}!`,
        variant: "default"
      });
      
      setIsInvestmentDialogOpen(false);
      setInvestmentAmount('');
      setEmail('');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't save your interest. Please try again later.",
        variant: "destructive"
      });
      console.error('Error in submit handler:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="invest" className="py-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-medium mb-4 animate-fade-in text-gradient-metallic tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            Invest in our Journey
          </h2>
          <p className="text-base md:text-lg text-[#8E8E93] max-w-2xl mx-auto animate-fade-in animate-delay-100 font-sfpro">
            Help us transform the dining reservation experience and be part of our success.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto animate-fade-in animate-delay-200 shadow-xl">
          <FundingProgressBar 
            raisedAmount={raisedAmount}
            interestedAmount={interestedAmount}
            targetAmount={targetAmount}
            committedPercentage={committedPercentage}
            interestedPercentage={interestedPercentage}
          />
          
          <FundingUseCards />
          
          <div className="text-center">
            <button 
              onClick={() => setIsInvestmentDialogOpen(true)}
              className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px] text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Invest Now'}
            </button>
            <p className="mt-3 text-white/60 text-xs">
              Minimum investment: $1,000
            </p>
          </div>
        </div>
      </div>

      <InvestmentDialog 
        isOpen={isInvestmentDialogOpen}
        onOpenChange={setIsInvestmentDialogOpen}
        investmentAmount={investmentAmount}
        setInvestmentAmount={setInvestmentAmount}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmitInterest}
      />
    </section>
  );
};

export default FundingProgress;
