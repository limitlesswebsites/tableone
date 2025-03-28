
import React from 'react';
import CountUp from '../CountUp';

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0
}) => {
  return (
    <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-10 flex flex-col items-center animate-fade-in hover:translate-y-[-5px] transition-all duration-500" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-2 text-white/60 text-sm font-medium uppercase tracking-wider">{title}</div>
      <div className="text-3xl md:text-4xl font-bold mb-3 flex items-center" style={{ color: '#05d9a7' }}>
        <span>{prefix}</span>
        <CountUp end={value} decimals={decimals} suffix={suffix} />
      </div>
      <div className="text-white/80 text-center gradient-subheading">
        {description}
      </div>
    </div>
  );
};

export default MetricCard;
