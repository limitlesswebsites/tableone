
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData } from '@/types/admin';

export const useInvestorCheckboxes = (
  combinedData: CombinedInvestorData[],
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedInvestorData[]>>,
  fetchInvestorData: () => Promise<void>
) => {
  const { toast } = useToast();

  // Handle checkbox change for reached_out and committed
  const handleCheckboxChange = async (email: string, field: 'reached_out' | 'committed') => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      const currentValue = investorToUpdate.status?.[field] || false;
      const newValue = !currentValue;
      
      // Immediately update local state for responsive UI
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                status: { 
                  ...investor.status as any,
                  [field]: newValue 
                } 
              } 
            : investor
        )
      );
      
      // Send update to database
      if (!investorToUpdate.status) {
        const { error } = await supabase
          .from('investor_status')
          .insert({ 
            investor_email: email, 
            [field]: newValue,
            notes: null,
            name: null,
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
      
      // If there was an error, revert the optimistic update by fetching fresh data
      await fetchInvestorData();
    }
  };

  return { handleCheckboxChange };
};
