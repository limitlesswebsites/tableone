
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import FundingProgressBar from './funding/FundingProgressBar';
import FundingUseCards from './funding/FundingUseCards';
import InvestmentDialog from './funding/InvestmentDialog';
import InvestmentCalculator from './funding/InvestmentCalculator';
import { supabase } from '@/integrations/supabase/client';

const FundingProgress: React.FC = () => {
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Investment data states
  const [raisedAmount, setRaisedAmount] = useState(55500); // Fixed base committed amount
  const [interestedAmount, setInterestedAmount] = useState(0); // Will be loaded from DB
  const [investorsCount, setInvestorsCount] = useState(0); // Count of interested investors
  const targetAmount = 400000; // Target amount
  
  // Calculate percentages
  const committedPercentage = (raisedAmount / targetAmount) * 100;
  const interestedPercentage = (interestedAmount / targetAmount) * 100;
  
  // Fetch investment interest data from Supabase
  useEffect(() => {
    const fetchInvestmentInterests = async () => {
      try {
        setIsLoading(true);
        
        // Fetch investment interests with joined status data
        const { data, error } = await supabase
          .from('investment_interests')
          .select(`
            *,
            investor_status:investor_status!investor_email(committed)
          `)
          
        if (error) {
          console.error('Error fetching investment interests:', error);
          throw error;
        }
        
        // Calculate total interested amount (excluding committed investors)
        const total = data?.reduce((sum, item) => {
          // Check if the investor is committed
          const isCommitted = item.investor_status && item.investor_status.committed;
          
          // Only add to interested amount if not committed
          return isCommitted ? sum : sum + Number(item.investment_amount);
        }, 0) || 0;
        
        // Calculate additional committed amount from investors
        const committedTotal = data?.reduce((sum, item) => {
          // Check if the investor is committed
          const isCommitted = item.investor_status && item.investor_status.committed;
          
          // Only add to committed amount if committed
          return isCommitted ? sum + Number(item.investment_amount) : sum;
        }, 0) || 0;
        
        setInterestedAmount(total);
        setRaisedAmount(prevAmount => 55500 + committedTotal); // Base amount plus committed investors
        
        // Set count of interested investors (excluding committed ones)
        setInvestorsCount(data?.filter(item => 
          !(item.investor_status && item.investor_status.committed)
        ).length || 0);
        
      } catch (error) {
        console.error('Error in useEffect:', error);
        toast({
          title: "Failed to load investment data",
          description: "There was an issue retrieving the current investment interests.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestmentInterests();
  }, [toast]);
  
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
            We are raising this round as a SAFE with a $4,000,000 post-money valuation.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto animate-fade-in animate-delay-200 shadow-xl">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-3 text-white/60">Loading investment data...</p>
            </div>
          ) : (
            <>
              <FundingProgressBar 
                raisedAmount={raisedAmount}
                interestedAmount={interestedAmount}
                targetAmount={targetAmount}
                committedPercentage={committedPercentage}
                interestedPercentage={interestedPercentage}
              />
              
              <div className="text-center mt-1 mb-8">
                <p className="text-white/70 text-sm">
                  <span className="font-semibold">{investorsCount}</span> {investorsCount === 1 ? 'investor has' : 'investors have'} expressed interest
                </p>
              </div>
            </>
          )}
          
          <FundingUseCards />
          
          {/* Add the investment calculator component here */}
          {/* <InvestmentCalculator /> */}
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setIsInvestmentDialogOpen(true)}
              className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px] text-sm"
            >
              I'm Interested
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
        setIsOpen={setIsInvestmentDialogOpen}
      />
    </section>
  );
};

export default FundingProgress;
