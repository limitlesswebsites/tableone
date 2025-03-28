
import React from 'react';
import CountUp from './CountUp';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const lifetimeValueData = [
  { month: 'Oct \'24', value: 47.37 },
  { month: 'Nov \'24', value: 44.44 },
  { month: 'Dec \'24', value: 51.93 },
  { month: 'Jan \'25', value: 57.69 },
  { month: 'Feb \'25', value: 60.41 },
  { month: 'Mar \'25', value: 71.02 },
];

const churnRateData = [
  { month: 'Oct \'24', value: 13.2 },
  { month: 'Nov \'24', value: 16.8 },
  { month: 'Dec \'24', value: 14.0 },
  { month: 'Jan \'25', value: 12.4 },
  { month: 'Feb \'25', value: 12.1 },
  { month: 'Mar \'25', value: 9.8 },
];

const Metrics: React.FC = () => {
  return (
    <section id="metrics" className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 animate-fade-in tracking-tight">Exceptional Performance Metrics</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            TableOne is far outperforming industry benchmarks with a proven business model and sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-10 flex flex-col items-center animate-fade-in animate-delay-200 hover:translate-y-[-5px] transition-all duration-500">
            <div className="mb-2 text-white/60 text-sm font-medium uppercase tracking-wider">Annual Recurring Revenue</div>
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
              $<CountUp end={151286.88} decimals={2} />
            </div>
            <div className="text-white/80 text-center">
              Growing steadily month over month
            </div>
          </div>
          
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-10 flex flex-col items-center animate-fade-in animate-delay-300 hover:translate-y-[-5px] transition-all duration-500">
            <div className="mb-2 text-white/60 text-sm font-medium uppercase tracking-wider">Operating Expenses</div>
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
              $<CountUp end={514} prefix="" suffix="/mo" />
            </div>
            <div className="text-white/80 text-center">
              Lean operations with high margin
            </div>
          </div>
          
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-10 flex flex-col items-center animate-fade-in animate-delay-400 hover:translate-y-[-5px] transition-all duration-500">
            <div className="mb-2 text-white/60 text-sm font-medium uppercase tracking-wider">App Downloads</div>
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
              <CountUp end={35000} suffix="+" />
            </div>
            <div className="text-white/80 text-center">
              In just 18 months
            </div>
          </div>
          
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-10 flex flex-col items-center animate-fade-in animate-delay-500 hover:translate-y-[-5px] transition-all duration-500">
            <div className="mb-2 text-white/60 text-sm font-medium uppercase tracking-wider">Paid Members</div>
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
              <CountUp end={2000} suffix="+" />
            </div>
            <div className="text-white/80 text-center">
              Active paying subscribers
            </div>
          </div>
        </div>
        
        {/* Line Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Subscriber Lifetime Value Graph */}
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in animate-delay-500">
            <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Lifetime Value</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lifetimeValueData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'LTV']}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="LTV" 
                    stroke="#05d9a7" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center text-white/70">
              <p>Average LTV increasing to $71.02 per subscriber</p>
            </div>
          </div>
          
          {/* Subscriber Churn Rate Graph */}
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in animate-delay-600">
            <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Churn Rate</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={churnRateData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Churn Rate']}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Churn Rate" 
                    stroke="#05d9a7" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center text-white/70">
              <p>Churn rate decreasing to 9.8% in March 2025</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in">Exceeding Industry Benchmarks</h3>
          <p className="text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            TableOne dramatically outperforms metrics for exceptional paid consumer apps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
