
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

  // Monthly interest data for chart
  const [monthlyData, setMonthlyData] = useState<{ month: string, value: number }[]>([]);

  // Calculate metrics
  const totalInterestedAmount = investorData.reduce((sum, investor) => sum + investor.investment_amount, 0);
  const totalInvestorCount = investorData.length;
  const averageInvestmentAmount = totalInvestorCount > 0 ? totalInterestedAmount / totalInvestorCount : 0;
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle order if clicking on the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
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
      
      // Update local state first for responsive UI
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
      
      // Check if we need to create a new record or update existing one
      if (!investorToUpdate.status) {
        // Create a new record
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
        // Update existing record
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
      
      // Revert local state on error
      await fetchInvestorData();
    }
  };
  
  // Handle saving notes
  const handleSaveNotes = async (email: string, notes: string) => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      // Update local state first for responsive UI
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
      
      // Check if we need to create a new record or update existing one
      if (!investorToUpdate.status) {
        // Create a new record
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
        // Update existing record
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
      
      // Revert local state on error
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
      
      // Fetch investment interests
      const { data: interestsData, error: interestsError } = await supabase
        .from('investment_interests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (interestsError) {
        console.error('Error fetching investment interests:', interestsError);
        throw interestsError;
      }
      
      // Set investor interest data
      setInvestorData(interestsData || []);
      
      try {
        // Fetch investor status data
        const { data: statusData, error: statusError } = await supabase
          .from('investor_status')
          .select('*');
          
        if (statusError) {
          console.error('Error fetching investor status:', statusError);
          // Don't throw here, just set empty array to continue
          setInvestorStatusData([]);
        } else {
          // Set investor status data with proper type assertion
          setInvestorStatusData(statusData as unknown as InvestorStatus[]);
          
          // Combine the data
          const combined = (interestsData || []).map(interest => {
            // Find the corresponding status record (if any) using investor_email
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
        // Continue with just the investment data
        const combined = (interestsData || []).map(interest => ({
          ...interest,
          isEditing: false,
          editedNotes: ''
        }));
        setCombinedData(combined);
      }
      
      // Process data for monthly chart
      const monthlyInterest = processMonthlyData(interestsData || []);
      setMonthlyData(monthlyInterest);
      
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

  // Process data to show monthly interest totals
  const processMonthlyData = (data: InvestorInterest[]): { month: string, value: number }[] => {
    const monthlyTotals: Record<string, number> = {};
    
    data.forEach(item => {
      const date = new Date(item.created_at);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      
      monthlyTotals[monthYear] += item.investment_amount;
    });
    
    return Object.entries(monthlyTotals)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');
        
        if (yearA !== yearB) return Number(yearA) - Number(yearB);
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months.indexOf(monthA) - months.indexOf(monthB);
      });
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
    monthlyData,
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
