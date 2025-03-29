
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ChartData {
  month: string;
  value: number;
}

interface LifetimeValueChartProps {
  data: ChartData[];
}

const LifetimeValueChart: React.FC<LifetimeValueChartProps> = ({ data }) => {
  return (
    <>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.6)"
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, "Subscriber Lifetime Value"]}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Subscriber Lifetime Value" 
              stroke="#05d9a7" 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center gradient-subheading">
        <p>Average LTV increasing to $71.02 per subscriber</p>
      </div>
    </>
  );
};

export default LifetimeValueChart;
