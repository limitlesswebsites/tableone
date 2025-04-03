
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InvestorInterest, InvestorStatus, CombinedInvestorData } from '@/types/admin';

export const useInvestorDataFetching = () => {
  const [investorData, setInvestorData] = useState<InvestorInterest[]>([]);
  const [investorStatusData, setInvestorStatusData] = useState<InvestorStatus[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedInvestorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch investment interest data and status data
  const fetchInvestorData = async () => {
    try {
      setIsLoading(true);
      
      const { data: interestsData, error: interestsError } = await supabase
        .from('investment_interests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (interestsError) {
        console.error('Error fetching investment interests:', interestsError);
        throw interestsError;
      }
      
      setInvestorData(interestsData || []);
      
      try {
        const { data: statusData, error: statusError } = await supabase
          .from('investor_status')
          .select('*');
          
        if (statusError) {
          console.error('Error fetching investor status:', statusError);
          setInvestorStatusData([]);
        } else {
          setInvestorStatusData(statusData as unknown as InvestorStatus[]);
          
          const combined = (interestsData || []).map(interest => {
            const status = (statusData || []).find(
              s => (s as any).investor_email === interest.email
            ) as unknown as InvestorStatus | undefined;
            
            return {
              ...interest,
              status,
              isEditingNotes: false,
              isEditingName: false,
              editedNotes: status?.notes || '',
              editedName: status?.name || ''
            };
          });
          
          setCombinedData(combined);
        }
      } catch (statusError) {
        console.error('Error handling status data:', statusError);
        const combined = (interestsData || []).map(interest => ({
          ...interest,
          isEditingNotes: false,
          isEditingName: false,
          editedNotes: '',
          editedName: ''
        }));
        setCombinedData(combined);
      }
      
    } catch (error) {
      console.error('Error in fetchInvestorData:', error);
      toast({
        title: "Failed to load investment data",
        description: "There was an issue retrieving the investment interests.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    investorData,
    setInvestorData,
    investorStatusData,
    setInvestorStatusData,
    combinedData,
    setCombinedData,
    isLoading,
    fetchInvestorData
  };
};
