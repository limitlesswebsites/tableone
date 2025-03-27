
import React from 'react';
import CountUp from './CountUp';

const Metrics: React.FC = () => {
  return (
    <section id="metrics" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Exceptional Performance Metrics</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            TableOne is far outperforming industry benchmarks with a proven business model and sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-8 flex flex-col items-center animate-fade-in animate-delay-200">
            <div className="mb-2 text-white/60 text-sm font-medium">Annual Recurring Revenue</div>
            <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
              $<CountUp end={151286.88} decimals={2} />
            </div>
            <div className="text-white/80 text-center">
              Growing steadily month over month
            </div>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center animate-fade-in animate-delay-300">
            <div className="mb-2 text-white/60 text-sm font-medium">Operating Expenses</div>
            <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
              $<CountUp end={514} prefix="" suffix="/mo" />
            </div>
            <div className="text-white/80 text-center">
              Lean operations with high margin
            </div>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center animate-fade-in animate-delay-400">
            <div className="mb-2 text-white/60 text-sm font-medium">App Downloads</div>
            <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
              <CountUp end={35000} suffix="+" />
            </div>
            <div className="text-white/80 text-center">
              In just 18 months
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">Exceeding Industry Benchmarks</h3>
          <p className="text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            TableOne dramatically outperforms metrics for exceptional paid consumer apps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
