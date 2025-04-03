import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData, InvestorInterest, InvestorStatus, SortField, SortOrder } from '@/types/admin';

export const useInvestorData = () => {
  const [investorData, setInvestorData] = useState<InvestorInterest[]>([]);
  const [investorStatusData, setInvestorStatusData] = useState<InvestorStatus[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedInvestorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Sorting states
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Calculate metrics
  const totalInterestedAmount = investorData.reduce((sum, investor) => sum + investor.investment_amount, 0);
  const totalInvestorCount = investorData.length;
  const averageInvestmentAmount = totalInvestorCount > 0 ? totalInterestedAmount / totalInvestorCount : 0;
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Toggle edit mode for a specific investor
  const toggleEditMode = (email: string) => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { 
              ...investor, 
              isEditing: !investor.isEditing,
              editedNotes: investor.status?.notes || ''
            } 
          : investor
      )
    );
  };

  // Handle checkbox change for reached_out and committed
  const handleCheckboxChange = async (email: string, field: 'reached_out' | 'committed') => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      const currentValue = investorToUpdate.status?.[field] || false;
      const newValue = !currentValue;
      
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                status: { 
                  ...investor.status as InvestorStatus,
                  [field]: newValue 
                } 
              } 
            : investor
        )
      );
      
      if (!investorToUpdate.status) {
        const { error } = await supabase
          .from('investor_status')
          .insert({ 
            investor_email: email, 
            [field]: newValue,
            notes: null,
            reached_out: field === 'reached_out' ? newValue : false,
            committed: field === 'committed' ? newValue : false
          } as any);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('investor_status')
          .update({ [field]: newValue } as any)
          .eq('investor_email', email);
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Investor ${field.replace('_', ' ')} status updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast({
        title: `Failed to update ${field.replace('_', ' ')} status`,
        description: "There was an error updating the status.",
        variant: "destructive"
      });
      
      await fetchInvestorData();
    }
  };
  
  // Handle saving notes
  const handleSaveNotes = async (email: string, notes: string) => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                isEditing: false,
                status: { 
                  ...investor.status as InvestorStatus,
                  notes 
                } 
              } 
            : investor
        )
      );
      
      if (!investorToUpdate.status) {
        const { error } = await supabase
          .from('investor_status')
          .insert({ 
            investor_email: email, 
            notes,
            reached_out: false,
            committed: false
          } as any);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('investor_status')
          .update({ notes } as any)
          .eq('investor_email', email);
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: "Investor notes updated successfully",
      });
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Failed to update notes",
        description: "There was an error updating the notes.",
        variant: "destructive"
      });
      
      await fetchInvestorData();
    }
  };
  
  // Handle notes input change
  const handleNotesChange = (email: string, notes: string) => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { ...investor, editedNotes: notes } 
          : investor
      )
    );
  };

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
              isEditing: false,
              editedNotes: status?.notes || ''
            };
          });
          
          setCombinedData(combined);
        }
      } catch (statusError) {
        console.error('Error handling status data:', statusError);
        const combined = (interestsData || []).map(interest => ({
          ...interest,
          isEditing: false,
          editedNotes: ''
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
    totalInvestorCount,
    averageInvestmentAmount,
    handleSort,
    toggleEditMode,
    handleCheckboxChange,
    handleSaveNotes,
    handleNotesChange,
  };
};
