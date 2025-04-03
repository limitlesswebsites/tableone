
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CombinedInvestorData, InvestorStatus } from '@/types/admin';

export const useInvestorEditing = (
  combinedData: CombinedInvestorData[],
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedInvestorData[]>>,
  refetchData: () => Promise<void>
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
      
      await refetchData();
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
                isEditingNotes: false,
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
      
      await refetchData();
    }
  };

  // Handle saving name
  const handleSaveName = async (email: string, name: string) => {
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
                  ...investor.status as InvestorStatus,
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
      
      await refetchData();
    }
  };

  return {
    toggleEditMode,
    handleCheckboxChange,
    handleNotesChange,
    handleNameChange,
    handleSaveNotes,
    handleSaveName
  };
};
