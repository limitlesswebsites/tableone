
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface InvestmentMetricsCardProps {
  averageInvestmentAmount: number;
  targetAmount: number;
  committedAmount: number;
  totalInterestedAmount: number;
  userCount: number;
}

const InvestmentMetricsCard: React.FC<InvestmentMetricsCardProps> = ({
  averageInvestmentAmount,
  targetAmount,
  committedAmount,
  totalInterestedAmount,
  userCount,
}) => {
  // Calculate the total amount (committed + interested)
  const totalAmount = committedAmount + totalInterestedAmount;
  
  return (
    <Card className="backdrop-blur-xl bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="text-center text-gradient font-sfpro">Investment Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-white/70">Average Investment</span>
            <span className="font-semibold">${averageInvestmentAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-white/70">Target Amount</span>
            <span className="font-semibold">${targetAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-white/70">Total Funding %</span>
            <span className="font-semibold">
              {(totalAmount / targetAmount * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/70">Total Users</span>
            <span className="font-semibold">
              {userCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentMetricsCard;
