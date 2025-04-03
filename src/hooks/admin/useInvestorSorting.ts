
import { useState } from 'react';
import { SortField, SortOrder, CombinedInvestorData } from '@/types/admin';

export const useInvestorSorting = (combinedData: CombinedInvestorData[]) => {
  // Sorting states
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

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
    sortField,
    sortOrder,
    sortedInvestors,
    handleSort
  };
};
