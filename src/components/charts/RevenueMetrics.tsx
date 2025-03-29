
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle }) => {
  return (
    <div className="text-center p-4 bg-white/5 rounded-xl">
      <div className="text-sm text-white/60 mb-1">{title}</div>
      <div className="text-2xl font-bold" style={{ color: '#05d9a7' }}>{value}</div>
      <div className="text-xs text-white/50">{subtitle}</div>
    </div>
  );
};

const RevenueMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <MetricCard 
        title="New Subscribers" 
        value="+312" 
        subtitle="last month" 
      />
      <MetricCard 
        title="Revenue Growth" 
        value="+4.28%" 
        subtitle="month over month" 
      />
      <MetricCard 
        title="Retention Rate" 
        value="90.2%" 
        subtitle="improving steadily" 
      />
    </div>
  );
};

export default RevenueMetrics;
