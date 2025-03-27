
import React from 'react';
import CountUp from './CountUp';

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
