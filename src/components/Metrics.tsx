
import React, { useEffect, useState } from 'react';
import MetricCard from './metrics/MetricCard';
import ChartPanel from './metrics/ChartPanel';
import { lifetimeValueData, churnRateData } from './metrics/chartData';

const Metrics: React.FC = () => {
  // Log confirmation to check if component is rendering
  console.log("Metrics component rendering");
  
  // State to track if image is loaded
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Pre-load the image to ensure it's available
  useEffect(() => {
    const img = new Image();
    img.src = '/lovable-uploads/4d8c82f4-9545-4a55-a994-77325d811978.png';
    img.onload = () => {
      console.log("Background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Error loading background image:", e);
    };
  }, []);
  
  return (
    <section id="metrics" className="py-20 relative">
      {/* Background image - using inline styles with important to override any conflicting styles */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: "url('/lovable-uploads/4d8c82f4-9545-4a55-a994-77325d811978.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4, // Increased opacity for better visibility
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" /> {/* Reduced overlay opacity for better image visibility */}
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-2xl md:text-4xl mb-5 animate-fade-in gradient-heading">
            We've Exceeded Expectations...Even Our Own
          </h2>
          <p className="text-base max-w-2xl mx-auto animate-fade-in animate-delay-100 gradient-subheading">
            TableOne is not a traditional restaurant tech startup, boasting high margins, organic growth, and paid user adoption.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <MetricCard 
            title="Annual Recurring Revenue"
            value={151286.88}
            description="Growing steadily month over month"
            prefix="$"
            decimals={2}
            delay={200}
          />
          
          <MetricCard 
            title="Operating Expenses"
            value={514}
            description="Lean operations with high margin"
            prefix="$"
            suffix="/mo"
            delay={300}
          />
          
          <MetricCard 
            title="App Downloads"
            value={35000}
            description="In just 18 months"
            suffix="+"
            delay={400}
          />
          
          <MetricCard 
            title="Paid Members"
            value={2000}
            description="Active paying subscribers"
            suffix="+"
            delay={500}
          />
        </div>
        
        {/* Line Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ChartPanel 
            title="Subscriber Lifetime Value"
            description="Average LTV increasing to $71.02 per subscriber"
            data={lifetimeValueData}
            valuePrefix="$"
            animationDelay={500}
          />
          
          <ChartPanel 
            title="Subscriber Churn Rate"
            description="Churn rate decreasing to 9.8% in March 2025"
            data={churnRateData}
            valueSuffix="%"
            animationDelay={600}
          />
        </div>
        
        <div className="text-center mt-16 mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in gradient-heading">Exceeding Industry Benchmarks</h3>
          <p className="gradient-subheading max-w-2xl mx-auto animate-fade-in animate-delay-100">
            TableOne dramatically outperforms metrics for exceptional paid consumer apps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
