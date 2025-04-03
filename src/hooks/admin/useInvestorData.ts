
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useInvestorDataFetching } from './useInvestorDataFetching';
import { useInvestorMetrics } from './useInvestorMetrics';
import { useInvestorSorting } from './useInvestorSorting';
import { useInvestorEditing } from './useInvestorEditing';
import { useInvestorRealtime } from './useInvestorRealtime';

export const useInvestorData = () => {
  const { toast } = useToast();

  // Data fetching
  const {
    investorData,
    setInvestorData,
    combinedData,
    setCombinedData,
    isLoading,
    fetchInvestorData
  } = useInvestorDataFetching();

  // Metrics calculation
  const { totalInterestedAmount, totalInvestorCount, averageInvestmentAmount } = useInvestorMetrics(investorData);

  // Sorting
  const { sortField, sortOrder, sortedInvestors, handleSort } = useInvestorSorting(combinedData);

  // Editing functions
  const {
    toggleEditMode,
    handleCheckboxChange,
    handleNotesChange,
    handleNameChange,
    handleSaveNotes,
    handleSaveName
  } = useInvestorEditing(combinedData, setCombinedData, fetchInvestorData);

  // Realtime updates
  useInvestorRealtime(investorData, setInvestorData, setCombinedData);

  // Initial data fetch
  useEffect(() => {
    fetchInvestorData();
  }, [toast]);

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
    handleNameChange,
    handleSaveName
  };
};
