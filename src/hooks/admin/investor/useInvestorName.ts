
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData } from '@/types/admin';

export const useInvestorName = (
  combinedData: CombinedInvestorData[],
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedInvestorData[]>>,
  fetchInvestorData: () => Promise<void>
) => {
  const { toast } = useToast();

  // Handle saving name
  const handleSaveName = async (email: string, name: string): Promise<void> => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                isEditingName: false,
                status: { 
                  ...investor.status as any,
                  name 
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
            name,
            notes: null,
            reached_out: false,
            committed: false
          } as any);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('investor_status')
          .update({ name } as any)
          .eq('investor_email', email);
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: "Investor name updated successfully",
      });
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        title: "Failed to update name",
        description: "There was an error updating the name.",
        variant: "destructive"
      });
      
      await fetchInvestorData();
    }
  };

  // Handle name input change
  const handleNameChange = (email: string, name: string) => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { ...investor, editedName: name } 
          : investor
      )
    );
  };

  return {
    handleNameChange,
    handleSaveName
  };
};
