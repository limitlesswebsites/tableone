import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import FundingProgressBar from './funding/FundingProgressBar';
import FundingUseCards from './funding/FundingUseCards';
import InvestmentDialog from './funding/InvestmentDialog';
import { supabase } from '@/integrations/supabase/client';

const FundingProgress: React.FC = () => {
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Investment data states
  const [raisedAmount, setRaisedAmount] = useState(55500); // Fixed base committed amount
  const [interestedAmount, setInterestedAmount] = useState(0); // Will be loaded from DB
  const targetAmount = 400000; // Target amount
  
  // Calculate percentages
  const committedPercentage = (raisedAmount / targetAmount) * 100;
  const interestedPercentage = (interestedAmount / targetAmount) * 100;
  
  async function investNow() {
		window.open("https://wefunder.com/tableone", '_blank');
  }

  // Fetch investment interest data from Supabase
  useEffect(() => {
    const fetchInvestmentInterests = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all investment interests
        const { data: interestsData, error: interestsError } = await supabase
          .from('investment_interests')
          .select('*');
        
        if (interestsError) {
          console.error('Error fetching investment interests:', interestsError);
          throw interestsError;
        }
        
        // Fetch all investor statuses
        const { data: statusData, error: statusError } = await supabase
          .from('investor_status')
          .select('*');
        
        if (statusError) {
          console.error('Error fetching investor statuses:', statusError);
          throw statusError;
        }
        
        // Match investment interests with their statuses
        const combinedData = interestsData.map(interest => ({
          ...interest,
          status: statusData.find(status => status.investor_email === interest.email) || null
        }));
        
        // Calculate total interested amount (excluding committed investors)
        const total = combinedData.reduce((sum, item) => {
          // Check if the investor is committed
          const isCommitted = item.status && item.status.committed;
          
          // Only add to interested amount if not committed
          return isCommitted ? sum : sum + Number(item.investment_amount);
        }, 0);
        
        // Calculate additional committed amount from investors
        const committedTotal = combinedData.reduce((sum, item) => {
          // Check if the investor is committed
          const isCommitted = item.status && item.status.committed;
          
          // Only add to committed amount if committed
          return isCommitted ? sum + Number(item.investment_amount) : sum;
        }, 0);
        
        setInterestedAmount(total);
        setRaisedAmount(prevAmount => 55500 + committedTotal); // Base amount plus committed investors
        
        // We're no longer tracking the count of investors, so this line is removed
        
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
            We are raising this round on Wefunder via SAFEs <br/>
            $4mm post-money valuation for early-bird investors and $5mm for public launch.
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
                raisedAmount={484501}
                interestedAmount={0}
                targetAmount={100000}
                committedPercentage={committedPercentage}
                interestedPercentage={interestedPercentage}
              />
            </>
          )}
          
          <FundingUseCards />
          
          <div className="text-center mt-8">
            <button 
              onClick={() => investNow()}
              className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-2px] text-sm"
            >
              Invest Now
            </button>
            <p className="mt-3 text-white/60 text-xs">
              Minimum investment: $500
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
