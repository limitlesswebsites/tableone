import React from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  month: string;
  value: number;
}

interface ChartPanelProps {
  title: string;
  description: string;
  data: ChartData[];
  valuePrefix?: string;
  valueSuffix?: string;
  animationDelay?: number;
}

const ChartPanel: React.FC<ChartPanelProps> = ({
  title,
  description,
  data,
  valuePrefix = '',
  valueSuffix = '',
  animationDelay = 0
}) => {
  const formatValue = (value: number): string => {
    return `${valuePrefix}${value}${valueSuffix}`;
  };

  return (
    <div 
      className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in" 
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <h3 className="text-xl font-semibold mb-4 text-center text-gradient font-sfpro">{title}</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.6)"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatValue(value)}
            />
            <Tooltip 
              formatter={(value) => [formatValue(value as number), title]}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              name={title} 
              stroke="#05d9a7" 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 text-center text-[#8E8E93] font-sfpro">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ChartPanel;
