
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CountUp from './CountUp';

const RevenueChart: React.FC = () => {
  // Current month is March 2025
  const currentMonth = new Date(2025, 2);
  
  const revenueData = [
    { month: 'Oct 2024', forecast: 126000, actual: 130500 },
    { month: 'Nov 2024', forecast: 135000, actual: 140200 },
    { month: 'Dec 2024', forecast: 143000, actual: 151286 },
    { month: 'Jan 2025', forecast: 155000, actual: 162400 },
    { month: 'Feb 2025', forecast: 168000, actual: 175300 },
    { month: 'Mar 2025', forecast: 182000, actual: 189500 },
    { month: 'Apr 2025', forecast: 210000, actual: null },
    { month: 'May 2025', forecast: 240000, actual: null },
    { month: 'Jun 2025', forecast: 280000, actual: null },
    { month: 'Jul 2025', forecast: 340000, actual: null },
    { month: 'Aug 2025', forecast: 410000, actual: null },
    { month: 'Sep 2025', forecast: 500000, actual: null },
    { month: 'Oct 2025', forecast: 620000, actual: null },
    { month: 'Nov 2025', forecast: 780000, actual: null },
    { month: 'Dec 2025', forecast: 1000000, actual: null },
  ];
  
  const [visibleMonths, setVisibleMonths] = useState(8);
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US')}`;
  };
  
  return (
    <section id="forecast" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Revenue Growth Trajectory
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            We've unlocked organic growth and are ready for scale.
          </p>
        </div>
        
        <div className="glass-card p-6 md:p-8 animate-fade-in animate-delay-200">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-1">Current ARR</h3>
              <div className="text-3xl font-bold text-gradient-gold">
                $<CountUp end={189500} />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-white/80">Forecast</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-white/80">Actual</span>
              </div>
              <div className="hidden md:block">
                <select 
                  className="bg-white/5 border border-white/10 rounded-md text-white py-1 px-3 text-sm"
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
          
          <div className="h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData.slice(0, visibleMonths)}
                margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.6)"
                  angle={-45}
                  textAnchor="end"
                  tick={{fontSize: 12}}
                  height={60}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tickFormatter={formatCurrency}
                  tick={{fontSize: 12}}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar 
                  dataKey="forecast" 
                  name="Forecast" 
                  fill="rgba(59, 130, 246, 0.8)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="actual" 
                  name="Actual" 
                  fill="rgba(139, 92, 246, 0.8)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="block md:hidden mt-4">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-md text-white py-2 px-3"
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
