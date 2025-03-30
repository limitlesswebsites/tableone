
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MonthlyData {
  name: string;
  value: number;
}

interface SubscriberGrowthChartProps {
  data: MonthlyData[];
}

const SubscriberGrowthChart: React.FC<SubscriberGrowthChartProps> = ({ data }) => {
  return (
    <>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
            />
            <Tooltip
              formatter={(value) => [`${(value as number).toLocaleString()}`, 'Subscribers']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
              }}
            />
            <defs>
              <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#9b87f5" 
              fillOpacity={1} 
              fill="url(#colorSubscribers)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center gradient-subheading">
        <p>Subscriber growth from 375 to 2,031 active users</p>
      </div>
    </>
  );
};

export default SubscriberGrowthChart;
