
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData, InvestorInterest, InvestorStatus, SortField, SortOrder } from '@/types/admin';
import { useInvestorCheckboxes } from './useInvestorCheckboxes';
import { useInvestorNotes } from './useInvestorNotes';
import { useInvestorName } from './useInvestorName';
import { calculateInvestorMetrics } from './utils/calculateMetrics';

export const useInvestorData = () => {
  const [investorData, setInvestorData] = useState<InvestorInterest[]>([]);
  const [investorStatusData, setInvestorStatusData] = useState<InvestorStatus[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedInvestorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Sorting states
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Import custom hooks for handling specific investor data operations
  const { handleCheckboxChange } = useInvestorCheckboxes(combinedData, setCombinedData, fetchInvestorData);
  const { toggleEditMode, handleSaveNotes, handleNotesChange } = useInvestorNotes(combinedData, setCombinedData, fetchInvestorData);
  const { handleNameChange, handleSaveName } = useInvestorName(combinedData, setCombinedData, fetchInvestorData);

  // Calculate metrics using the utility function
  const {
    totalInvestorCount,
    totalInterestedAmount,
    totalCommittedAmount,
    averageInvestmentAmount,
    userCount,
    totalUserAmount
  } = calculateInvestorMetrics(combinedData);
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Fetch investment interest data and status data
  async function fetchInvestorData() {
    try {
      setIsLoading(true);
      
      // Fetch all investment interests - including both valid and invalid entries
      // for admin review purposes
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
  }

  // Initial data fetch
  useEffect(() => {
    fetchInvestorData();
  }, [toast]);

  // Sort investors data
  const sortedInvestors = [...combinedData].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'email') {
      comparison = a.email.localeCompare(b.email);
    } else if (sortField === 'investment_amount') {
      comparison = a.investment_amount - b.investment_amount;
    } else if (sortField === 'created_at') {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return {
    investorData,
    isLoading,
    sortField,
    sortOrder,
    sortedInvestors,
    totalInterestedAmount,
    totalCommittedAmount,
    totalInvestorCount,
    totalUserAmount,
    averageInvestmentAmount,
    userCount,
    handleSort,
    toggleEditMode,
    handleCheckboxChange,
    handleSaveNotes,
    handleNotesChange,
    handleNameChange,
    handleSaveName
  };
};
