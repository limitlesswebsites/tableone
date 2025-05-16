
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData } from '@/types/admin';

export const useInvestorNotes = (
  combinedData: CombinedInvestorData[],
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedInvestorData[]>>,
  fetchInvestorData: () => Promise<void>
) => {
  const { toast } = useToast();

  // Toggle edit mode for a specific investor (notes or name)
  const toggleEditMode = (email: string, field: 'notes' | 'name' = 'notes') => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { 
              ...investor, 
              isEditingNotes: field === 'notes' ? !investor.isEditingNotes : false,
              isEditingName: field === 'name' ? !investor.isEditingName : false,
              editedNotes: field === 'notes' ? investor.status?.notes || '' : investor.editedNotes,
              editedName: field === 'name' ? investor.status?.name || '' : investor.editedName
            } 
          : investor
      )
    );
  };

  // Handle saving notes
  const handleSaveNotes = async (email: string, notes: string): Promise<void> => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                isEditingNotes: false,
                status: { 
                  ...investor.status as any,
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
            name: null,
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

  return {
    toggleEditMode,
    handleSaveNotes,
    handleNotesChange
  };
};
