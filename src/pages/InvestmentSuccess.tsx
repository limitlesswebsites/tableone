
import React from 'react';
import { Button } from '@/components/ui/button';

const InvestmentSuccess: React.FC = () => {
  const handleWefunderRedirect = () => {
    window.open("https://wefunder.com/tableone", '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-4xl font-medium mb-6 text-gradient-metallic">
            Thanks for your interest
          </h1>
          
          <p className="text-lg text-white/80 mb-8">
            We'll be in touch soon to answer any questions you may have.
          </p>
          
          <div className="h-px w-full bg-white/10" />
          
          <p className="text-lg text-white/80">
            However, if you're ready to reserve your spot in the fundraising round, feel free to register below at Wefunder
          </p>
          
          <Button
            onClick={handleWefunderRedirect}
            className="px-8 py-6 text-base rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1"
          >
            Register on Wefunder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuccess;
