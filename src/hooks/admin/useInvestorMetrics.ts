
import { InvestorInterest } from '@/types/admin';

export const useInvestorMetrics = (investorData: InvestorInterest[]) => {
  // Calculate metrics
  const totalInterestedAmount = investorData.reduce((sum, investor) => sum + investor.investment_amount, 0);
  const totalInvestorCount = investorData.length;
  const averageInvestmentAmount = totalInvestorCount > 0 ? totalInterestedAmount / totalInvestorCount : 0;
  
  return {
    totalInterestedAmount,
    totalInvestorCount,
    averageInvestmentAmount
  };
};
