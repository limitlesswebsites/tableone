
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FundingProgress: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState(10);
  
  const calculateBusinessPrice = (members: number) => {
    const pricePerPerson = 6.03;
    const monthlyTotal = members * pricePerPerson;
    return {
      monthly: monthlyTotal.toFixed(0),
      annual: (monthlyTotal * 12).toFixed(0)
    };
  };

  const businessPrice = calculateBusinessPrice(teamMembers);

  const pricingPlans = [
    {
      title: "Monthly",
      price: "$9",
      period: "/month",
      description: "Designed for travelers or those seeking a reservation for a special occasion."
    },
    {
      title: "Annual",
      price: "$59",
      period: "/year",
      description: "Designed for foodies or those who love to frequent NYC's fine dining scene.",
      popular: true
    },
    {
      title: "For Business",
      price: `$${businessPrice.monthly}`,
      period: "/month",
      description: "Get a discounted rate when you equip your whole team with TableOne. Perfect for client dinners or as a perk.",
      isCustom: true
    }
  ];
  
  return (
    <section id="pricing" className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium mb-4 animate-fade-in text-gradient-metallic tracking-tight leading-tight" style={{ letterSpacing: '-0.5px' }}>
            Access, without the big expense
          </h2>
          <p className="text-base md:text-lg text-[#8E8E93] max-w-2xl mx-auto animate-fade-in animate-delay-100 font-sfpro">
            Choose the plan that fits your dining lifestyle and unlock access to NYC's most coveted reservations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.title} 
              className={`relative bg-black/40 border-white/20 backdrop-blur-sm ${plan.popular ? 'ring-2 ring-purple-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-xl mb-2">{plan.title}</CardTitle>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <p className="text-[#8E8E93] text-sm leading-relaxed">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {plan.isCustom && (
                  <div className="mb-4">
                    <label className="block text-white/80 text-sm mb-2">Team members (minimum 10)</label>
                    <Input
                      type="number"
                      min="10"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(Math.max(10, parseInt(e.target.value) || 10))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500/50"
                    />
                    <p className="text-white/60 text-xs mt-1">
                      $6.03 per person/month • Annual: ${businessPrice.annual}
                    </p>
                  </div>
                )}
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                  onClick={() => window.open('https://app.formbricks.com/s/cm37i33lv000dgvqxfu4fddan', '_blank')}
                >
                  {plan.title === 'For Business' ? 'Contact Us' : 'Download Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            All plans include access to our exclusive reservation network
          </p>
        </div>
      </div>
    </section>
  );
};

export default FundingProgress;
