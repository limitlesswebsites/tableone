import React from 'react';
import CountUp from './CountUp';

interface BenchmarkProps {
  title: string;
  tableOneValue: number;
  benchmarkValue: number;
  description: string;
  delay: number;
}

const BenchmarkItem: React.FC<BenchmarkProps> = ({ 
  title, 
  tableOneValue, 
  benchmarkValue, 
  description,
  delay 
}) => {
  return (
    <div className={`glass-card p-6 animate-fade-in animate-delay-${delay}`}>
      <h4 className="text-lg font-semibold mb-5">{title}</h4>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-xs">TableOne</span>
          <span className="text-white text-xs font-medium">
            <CountUp end={tableOneValue} suffix="%" delay={delay * 100} />
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${tableOneValue}%`, transition: 'width 2s ease-in-out' }}
          ></div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-xs">Industry Benchmark</span>
          <span className="text-white/70 text-xs">
            <CountUp end={benchmarkValue} suffix="%" delay={delay * 100 + 500} />
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-white/30 h-2 rounded-full"
            style={{ width: `${benchmarkValue}%`, transition: 'width 2s ease-in-out' }}
          ></div>
        </div>
      </div>
      
      <p className="text-white/60 text-xs mt-5">{description}</p>
    </div>
  );
};

const Benchmarks: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BenchmarkItem
          title="Paid User Retention"
          tableOneValue={89}
          benchmarkValue={40}
          description="Our subscribers stay loyal far beyond industry standards."
          delay={200}
        />
        
        <BenchmarkItem
          title="Conversion Rate"
          tableOneValue={38.7}
          benchmarkValue={5}
          description="Users see our value and are eager to subscribe."
          delay={300}
        />
        
        <BenchmarkItem
          title="Organic Acquisition"
          tableOneValue={98}
          benchmarkValue={75}
          description="Near zero customer acquisition cost with high word of mouth."
          delay={400}
        />
      </div>
    </div>
  );
};

export default Benchmarks;
