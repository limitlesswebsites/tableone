
import React from 'react';
import CountUp from './CountUp';

const UserTrust: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Profile Images */}
      <div className="absolute inset-0 z-0">
        {/* Top left */}
        <div className="absolute top-[15%] left-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '0s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
        
        {/* Top center */}
        <div className="absolute top-[8%] left-[45%] w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '1.2s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
        
        {/* Top right */}
        <div className="absolute top-[22%] right-[15%] w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '0.8s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom left */}
        <div className="absolute bottom-[18%] left-[20%] w-18 h-18 md:w-22 md:h-22 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '1.6s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom center */}
        <div className="absolute bottom-[12%] left-[48%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '0.4s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom right */}
        <div className="absolute bottom-[25%] right-[20%] w-18 h-18 md:w-22 md:h-22 rounded-full overflow-hidden border-2 border-white/10 animate-float" style={{ animationDelay: '2s' }}>
          <img src="/lovable-uploads/69ba367c-d635-4f51-93a2-c6b0889724f7.png" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="mb-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="text-white">
                <CountUp end={35000} suffix="+" delay={500} duration={2000} /> downloads with <CountUp end={2000} suffix="+" delay={500} duration={2000} /> paying members
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
              TableOne members are high-earning, young professionals
            </p>
          </div>
          
          <div className="glass-card backdrop-blur-md bg-white/5 border border-white/10 px-6 py-4 mt-6 max-w-xl mx-auto opacity-0 animate-[fadeIn_0.8s_ease_forwards]" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm md:text-base text-white/80">
              Our members have an average household income of <span className="text-gradient">$185,000+</span> and average age of <span className="text-gradient">34</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTrust;
