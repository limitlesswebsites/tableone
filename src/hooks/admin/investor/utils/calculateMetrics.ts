
import { CombinedInvestorData } from '@/types/admin';

export const calculateInvestorMetrics = (combinedData: CombinedInvestorData[]) => {
  const totalInvestorCount = combinedData.length;
  
  // Base committed amount
  const baseCommittedAmount = 55500;
  
  // Calculate committed and interested amounts separately
  const committedAmounts = combinedData
    .filter(investor => investor.status?.committed)
    .reduce((sum, investor) => sum + investor.investment_amount, 0);
    
  const interestedAmounts = combinedData
    .filter(investor => !investor.status?.committed)
    .reduce((sum, investor) => sum + investor.investment_amount, 0);
  
  const totalInterestedAmount = interestedAmounts;
  const totalCommittedAmount = baseCommittedAmount + committedAmounts;
  
  const averageInvestmentAmount = totalInvestorCount > 0 
    ? (totalInterestedAmount + committedAmounts) / totalInvestorCount 
    : 0;

  return {
    totalInvestorCount,
    totalInterestedAmount,
    totalCommittedAmount,
    averageInvestmentAmount
  };
};
