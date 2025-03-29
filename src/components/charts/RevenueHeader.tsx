
import React from 'react';
import CountUp from '../CountUp';

interface RevenueHeaderProps {
  currentARR: number;
}

const RevenueHeader: React.FC<RevenueHeaderProps> = ({ currentARR }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-white/80 mb-1">Current Annual Recurring Revenue</h3>
        <div className="text-3xl md:text-4xl font-bold" style={{ color: '#05d9a7' }}>
          <CountUp end={currentARR} prefix="$" suffix="" decimals={0} />
        </div>
      </div>
      <div>
        <div className="flex items-center bg-white/5 px-4 py-2 rounded-full">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <span className="text-white/80 text-sm">+7.04% from previous month</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueHeader;
