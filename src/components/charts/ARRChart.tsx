
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

interface MonthlyData {
  name: string;
  value: number;
  isForecast?: boolean;
}

interface ARRChartProps {
  revenueData: MonthlyData[];
  forecastData: MonthlyData[];
}

const ARRChart: React.FC<ARRChartProps> = ({ revenueData, forecastData }) => {
  return (
    <>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[...revenueData, ...forecastData.map(item => ({ ...item, isForecast: true }))]
              .sort((a, b) => {
                const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return months.indexOf(a.name) - months.indexOf(b.name);
              })}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const label = props.payload.isForecast ? 'Forecasted Revenue' : 'Actual Revenue';
                return [`$${(value as number).toLocaleString()}`, label];
              }}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
              }}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#05d9a7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#05d9a7" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Line 
              type="monotone"
              dataKey="value"
              stroke="#05d9a7"
              strokeWidth={3}
              dot={{ fill: '#05d9a7', r: 4 }}
              activeDot={{ r: 6 }}
              name="Actual Revenue"
              connectNulls
              data={revenueData}
            />
            <Line 
              type="monotone"
              dataKey="value"
              stroke="#9b87f5"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#9b87f5', r: 4 }}
              activeDot={{ r: 6 }}
              name="Forecasted Revenue"
              connectNulls
              data={forecastData}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#05d9a7] mr-2"></div>
          <span className="text-white/80 text-sm">Actual Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
          <span className="text-white/80 text-sm">Forecasted Revenue</span>
        </div>
      </div>
    </>
  );
};

export default ARRChart;
