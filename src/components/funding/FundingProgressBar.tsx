
import React from 'react';
import CountUp from '../CountUp';

interface FundingProgressBarProps {
  raisedAmount: number;
  interestedAmount: number;
  targetAmount: number;
  committedPercentage: number;
  interestedPercentage: number;
}

const FundingProgressBar: React.FC<FundingProgressBarProps> = ({
  raisedAmount,
  interestedAmount,
  targetAmount,
  committedPercentage,
  interestedPercentage
}) => {
  // Calculate total amount and percentage
  const totalAmount = raisedAmount + interestedAmount;
  const totalPercentage = Math.min((totalAmount / targetAmount) * 100, 100);
  
  return (
    <div className="text-center mb-10">
      <div className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Funding Progress</div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gradient-metallic mb-2">
          $<CountUp end={totalAmount} />
        </div>
        <p className="text-white/70">Combined committed and interested capital</p>
        
        <div className="w-full mt-4 bg-white/10 h-2 rounded-full">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${totalPercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-2 mb-8 text-white/60 text-sm">
          <CountUp end={totalPercentage} decimals={1} suffix="%" /> of ${targetAmount.toLocaleString()} target
        </div>
      </div>
    </div>
  );
};

export default FundingProgressBar;
