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
    </div>
  );
};

export default FundingProgressBar;
