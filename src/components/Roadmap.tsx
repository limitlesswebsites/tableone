
import React from 'react';

const RoadmapItem: React.FC<{
  quarter: string;
  title?: string;
  description: string;
  isActive?: boolean;
  delay: number;
  logoImg?: string;
}> = ({ quarter, title, description, isActive = false, delay, logoImg }) => {
  return (
    <div className={`relative animate-fade-in animate-delay-${delay}`}>
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
        isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' : 'bg-white/30'
      } z-10`}></div>
      
      <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xs mx-auto hover:translate-y-[-5px] transition-all duration-500 shadow-xl">
        <div className="font-medium text-xs uppercase tracking-wider text-white/60 mb-2">{quarter}</div>
        {logoImg ? (
          <div className="mb-3 flex justify-center">
            <img src={logoImg} alt="Supergood Logo" className="w-full max-w-[180px]" style={{ height: 'auto', maxHeight: '100px' }} />
          </div>
        ) : (
          title && <h4 className="text-lg font-semibold mb-2 font-quicksand">{title}</h4>
        )}
        <p className="text-xs text-white/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl mb-4 animate-fade-in tracking-tight gradient-heading">
            Our Path to $1M in Revenue
          </h2>
          <p className="text-base max-w-2xl mx-auto animate-fade-in animate-delay-100 gradient-subheading">
            A clear roadmap with strategic initiatives to scale our proven model.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-16">
            <RoadmapItem
              quarter="Q2 2025"
              logoImg="/lovable-uploads/1048f04c-b9df-4458-9887-118342b7971d.png"
              description="Launch aggregated feed for restaurant reviews to boost user engagement and retention."
              isActive={true}
              delay={200}
            />
            
            <div className="md:mt-24">
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
          </div>
          
          <div className="mt-24 text-center">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 inline-block animate-fade-in animate-delay-500 shadow-xl">
              <h3 className="text-xl font-bold mb-2 gradient-heading">$1,000,000</h3>
              <p className="text-sm text-white/80">Annual Recurring Revenue Target</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
