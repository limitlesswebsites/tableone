
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceArea 
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
  type: 'actual' | 'forecast';
}

interface ARRChartProps {
  revenueData: ChartData[];
  forecastData: ChartData[];
}

const ARRChart: React.FC<ARRChartProps> = ({ revenueData, forecastData }) => {
  // Combine and sort the data
  const combinedData = [...revenueData, ...forecastData].sort((a, b) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [aMonth, aYear] = a.name.split(' ');
    const [bMonth, bYear] = b.name.split(' ');
    
    if (aYear !== bYear) {
      return aYear.localeCompare(bYear);
    }
    
    return months.indexOf(aMonth) - months.indexOf(bMonth);
  });

  // Find the last actual month for displaying the reference area
  const lastActualIndex = combinedData.findIndex(
    (item, index) => item.type === 'actual' && 
    (index === combinedData.length - 1 || combinedData[index + 1].type === 'forecast')
  );
  
  // Custom tooltip formatter
  const tooltipFormatter = (value: number, name: string, props: any) => {
    const label = props.payload.type === 'forecast' ? 'Forecasted Revenue' : 'Actual Revenue';
    return [`$${value.toLocaleString()}`, label];
  };

  return (
    <div className="flex flex-col gap-4">      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.6)"
              tick={{fontSize: 12}}
              allowDuplicatedCategory={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              tick={{fontSize: 12}}
            />
            
            {lastActualIndex > 0 && (
              <ReferenceArea
                x1={combinedData[lastActualIndex].name}
                x2={combinedData[combinedData.length - 1].name}
                fill="rgba(155, 135, 245, 0.05)"
                fillOpacity={0.3}
              />
            )}
            
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
              }}
              labelStyle={{
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            />
            
            <Line 
              type="monotone"
              dataKey="value"
              stroke="#05d9a7"
              strokeWidth={3}
              dot={{ fill: '#05d9a7', r: 4 }}
              activeDot={{ r: 6 }}
              name="Actual Revenue"
              data={revenueData}
            />
            
            <Line 
              type="monotone"
              dataKey="value"
              stroke="#9b87f5"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ fill: '#9b87f5', r: 3 }}
              activeDot={{ r: 5 }}
              name="Forecasted Revenue"
              data={forecastData}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#05d9a7] mr-2"></div>
          <span className="text-white/80 text-sm">Actual Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
          <span className="text-white/80 text-sm">Forecasted Revenue</span>
        </div>
      </div>
    </div>
  );
};

export default ARRChart;
