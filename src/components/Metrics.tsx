
import React from 'react';
import CountUp from './CountUp';
import { Chart } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const lifetimeValueData = [
  { month: 'Jan', value: 68 },
  { month: 'Feb', value: 74 },
  { month: 'Mar', value: 82 },
  { month: 'Apr', value: 91 },
  { month: 'May', value: 103 },
  { month: 'Jun', value: 118 },
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
        </div>
        
        {/* Line Graph for Subscriber Lifetime Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                    stroke="#8884d8" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center text-white/70">
              <p>Average LTV increasing to $118 per subscriber</p>
            </div>
          </div>
          
          {/* Placeholder for the second graph */}
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in animate-delay-600">
            <h3 className="text-xl font-semibold mb-4 text-center">Placeholder for Second Graph</h3>
            <div className="h-[250px] flex items-center justify-center">
              <p className="text-white/60">Second graph will be displayed here</p>
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
