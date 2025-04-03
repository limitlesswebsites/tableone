
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InvestorInterest, CombinedInvestorData } from '@/types/admin';

export const useInvestorRealtime = (
  investorData: InvestorInterest[],
  setInvestorData: React.Dispatch<React.SetStateAction<InvestorInterest[]>>,
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedInvestorData[]>>
) => {
  const { toast } = useToast();
  
  // Handle a new investment interest coming in via realtime
  const handleNewInvestmentInterest = async (newInterest: InvestorInterest) => {
    console.log('Received new investment interest:', newInterest);
    
    // Check if this is actually a new interest that's not in our data
    const exists = investorData.some(investor => investor.id === newInterest.id);
    if (exists) return;
    
    // Add to our investor data
    setInvestorData(prevData => [...prevData, newInterest]);
    
    // Add to combined data with default values
    setCombinedData(prevData => [
      ...prevData,
      {
        ...newInterest,
        isEditingNotes: false,
        isEditingName: false,
        editedNotes: '',
        editedName: ''
      }
    ]);
    
    toast({
      title: "New Investment Interest",
      description: `${newInterest.email} has expressed interest in investing $${newInterest.investment_amount.toLocaleString()}`,
    });
  };

  // Set up real-time listener for new investment interests
  useEffect(() => {
    // Subscribe to changes on the investment_interests table
    const channel = supabase
      .channel('investment_interests_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'investment_interests'
        },
        (payload) => {
          console.log('New investment interest received:', payload);
          // Handle the new record
          handleNewInvestmentInterest(payload.new as InvestorInterest);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [investorData, toast]);
};
