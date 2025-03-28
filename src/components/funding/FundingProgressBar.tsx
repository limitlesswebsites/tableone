
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
  return (
    <div className="text-center mb-10">
      <div className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Funding Progress</div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-bold text-lg">
          $<CountUp end={raisedAmount} />
        </span>
        <span className="text-white/60 text-lg">
          $<CountUp end={targetAmount} />
        </span>
      </div>
      
      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-2">
        <div className="h-full flex">
          {/* Committed amount (green) */}
          <div 
            className="h-full transition-all duration-1000 ease-out shimmer"
            style={{ width: `${committedPercentage}%`, backgroundColor: '#05d9a7' }}
          ></div>
          {/* Interested amount (purple) */}
          <div 
            className="h-full transition-all duration-1000 ease-out shimmer"
            style={{ width: `${interestedPercentage}%`, backgroundColor: '#8b38e7' }}
          ></div>
        </div>
      </div>
      
      <div className="mt-2 flex justify-between items-center text-xs text-white/60">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#05d9a7] mr-2"></span>
          <span>Committed: $<CountUp end={raisedAmount} /> (<CountUp end={committedPercentage} decimals={1} suffix="%" />)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#8b38e7] mr-2"></span>
          <span>Interested: $<CountUp end={interestedAmount} /> (<CountUp end={interestedPercentage} decimals={1} suffix="%" />)</span>
        </div>
      </div>
    </div>
  );
};

export default FundingProgressBar;
