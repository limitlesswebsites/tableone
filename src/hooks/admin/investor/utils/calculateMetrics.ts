
import { CombinedInvestorData } from '@/types/admin';

export const calculateInvestorMetrics = (combinedData: CombinedInvestorData[]) => {
  // Only count valid entries in metrics
  const validData = combinedData.filter(investor => investor.valid);
  
  const totalInvestorCount = combinedData.length; // Show all investors in count, including invalid ones
  
  // Base committed amount
  const baseCommittedAmount = 55500;
  
  // Calculate committed and interested amounts separately - only from valid entries
  const committedAmounts = validData
    .filter(investor => investor.status?.committed)
    .reduce((sum, investor) => sum + investor.investment_amount, 0);
    
  const interestedAmounts = validData
    .filter(investor => !investor.status?.committed)
    .reduce((sum, investor) => sum + investor.investment_amount, 0);
  
  const totalInterestedAmount = interestedAmounts;
  const totalUserAmount = committedAmounts;
  const totalCommittedAmount = baseCommittedAmount + committedAmounts;
  
  // Calculate average based on valid entries only
  const validInvestorCount = validData.length;
  const averageInvestmentAmount = validInvestorCount > 0 
    ? (totalInterestedAmount + committedAmounts) / validInvestorCount 
    : 0;

  // Count users (valid investors marked as committed)
  const userCount = validData.filter(investor => investor.status?.committed).length;

  return {
    totalInvestorCount,
    totalInterestedAmount,
    totalCommittedAmount,
    averageInvestmentAmount,
    userCount,
    totalUserAmount
  };
};
