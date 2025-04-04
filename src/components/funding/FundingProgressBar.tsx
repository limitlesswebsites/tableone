
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
  // Calculate total amount and percentage (without capping at 100%)
  const totalAmount = raisedAmount + interestedAmount;
  const totalPercentage = (totalAmount / targetAmount) * 100;
  
  // For the progress bar width, we still cap at 100% for visual purposes
  const barWidthPercentage = Math.min(totalPercentage, 100);
  
  return (
    <div className="text-center mb-10">
      <div className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Funding Progress</div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gradient-metallic mb-2">
          $<CountUp end={totalAmount} />
        </div>
        <p className="text-white/70">Committed and interested capital</p>
        
        <div className="w-11/12 mx-auto mt-4 bg-white/10 h-2 rounded-full">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${barWidthPercentage}%` }}
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
