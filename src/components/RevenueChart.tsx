
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CountUp from './CountUp';

const RevenueChart: React.FC = () => {
  // Current month is March 2025
  const currentMonth = new Date(2025, 2);
  
  const revenueData = [
    { month: 'Oct 2024', forecast: 35000, actual: 59000 },
    { month: 'Nov 2024', forecast: 71000, actual: 81000 },
    { month: 'Dec 2024', forecast: 107000, actual: 108000 },
    { month: 'Jan 2025', forecast: 122000, actual: 124000 },
    { month: 'Feb 2025', forecast: 141000, actual: 142000 },
    { month: 'Mar 2025', forecast: 160000, actual: 152000 },
    { month: 'Apr 2025', forecast: 191000, actual: null },
    { month: 'May 2025', forecast: 214000, actual: null },
    { month: 'Jun 2025', forecast: 263000, actual: null },
    { month: 'Jul 2025', forecast: 299000, actual: null },
    { month: 'Aug 2025', forecast: 331000, actual: null },
    { month: 'Sep 2025', forecast: 380000, actual: null },
    { month: 'Oct 2025', forecast: 424000, actual: null },
    { month: 'Nov 2025', forecast: 478000, actual: null },
    { month: 'Dec 2025', forecast: 514000, actual: null },
  ];
  
  const [visibleMonths, setVisibleMonths] = useState(8);
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US')}`;
  };
  
  return (
    <section id="forecast" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in">
            Revenue Growth Trajectory
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            We've unlocked organic growth and are ready for scale.
          </p>
        </div>
        
        <div className="glass-card p-5 md:p-6 animate-fade-in animate-delay-200">
          <div className="mb-5 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-1">Current ARR</h3>
              <div className="text-2xl font-bold text-gradient-gold">
                $<CountUp end={152000} />
              </div>
            </div>
            
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6633ff] mr-2"></div>
                <span className="text-xs text-white/80">Forecast</span>
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#05d9a7] mr-2"></div>
                <span className="text-xs text-white/80">Actual</span>
              </div>
              <div className="hidden md:block">
                <select 
                  className="bg-white/5 border border-white/10 rounded-md text-white py-1 px-2 text-xs"
                  value={visibleMonths}
                  onChange={(e) => setVisibleMonths(Number(e.target.value))}
                >
                  <option value={6}>6 Months</option>
                  <option value={8}>8 Months</option>
                  <option value={12}>12 Months</option>
                  <option value={15}>All Months</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="h-[350px] mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData.slice(0, visibleMonths)}
                margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.6)"
                  angle={-45}
                  textAnchor="end"
                  tick={{fontSize: 11}}
                  height={60}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tickFormatter={formatCurrency}
                  tick={{fontSize: 11}}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{fontSize: 12}}
                />
                <Legend wrapperStyle={{ display: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  name="Forecast" 
                  stroke="#6633ff"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual" 
                  stroke="#05d9a7"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="block md:hidden mt-4">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-md text-white py-1.5 px-3 text-xs"
              value={visibleMonths}
              onChange={(e) => setVisibleMonths(Number(e.target.value))}
            >
              <option value={6}>6 Months</option>
              <option value={8}>8 Months</option>
              <option value={12}>12 Months</option>
              <option value={15}>All Months</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
