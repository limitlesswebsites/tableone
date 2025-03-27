
import React from 'react';

const RoadmapItem: React.FC<{
  quarter: string;
  title: string;
  description: string;
  isActive?: boolean;
  delay: number;
}> = ({ quarter, title, description, isActive = false, delay }) => {
  return (
    <div className={`relative animate-fade-in animate-delay-${delay}`}>
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${
        isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' : 'bg-white/30'
      } z-10`}></div>
      
      <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-xs mx-auto hover:translate-y-[-5px] transition-all duration-500 shadow-xl">
        <div className="font-medium text-xs uppercase tracking-wider text-white/60 mb-3">{quarter}</div>
        <h4 className="text-xl font-semibold mb-3">{title}</h4>
        <p className="text-sm text-white/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 animate-fade-in tracking-tight">
            Our Path to $100K in Revenue
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            A clear roadmap with strategic initiatives to scale our proven model.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting roadmap items */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-16">
            <RoadmapItem
              quarter="Q2 2025"
              title="Supergood by TableOne"
              description="Launch aggregated feed for restaurant reviews to boost user engagement and retention."
              isActive={true}
              delay={200}
            />
            
            <div className="md:mt-32">
              <RoadmapItem
                quarter="Q3 2025"
                title="TableOne Plus One Events"
                description="Exclusive dining events to build community and create additional revenue streams."
                isActive={true}
                delay={300}
              />
            </div>
            
            <RoadmapItem
              quarter="Q4 2025"
              title="Multi-City Expansion"
              description="Launch in Chicago, Boston, and Washington DC to expand our geographic footprint."
              delay={400}
            />
            
            <div className="md:mt-32">
              <RoadmapItem
                quarter="Q1 2026"
                title="Premium Tier Launch"
                description="Introduce higher-priced tiers with exclusive benefits for power users."
                delay={500}
              />
            </div>
          </div>
          
          <div className="mt-32 text-center">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 inline-block animate-fade-in animate-delay-500 shadow-xl">
              <h3 className="text-2xl font-bold mb-3 text-gradient-pink">$100,000</h3>
              <p className="text-white/80">Annual Recurring Revenue Target</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
