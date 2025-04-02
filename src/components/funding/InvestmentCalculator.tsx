
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InvestmentCalculator: React.FC = () => {
  const [investment, setInvestment] = useState<string>('');
  const sharePrice = 0.40;
  
  // Calculate number of shares based on investment amount
  const numberOfShares = investment ? Math.floor(parseFloat(investment) / sharePrice) : 0;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInvestment(value);
    }
  };
  
  return (
    <div className="mt-8 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl">
      <h3 className="text-xl font-medium mb-4 text-center text-gradient-metallic">
        How much would my investment get me?
      </h3>
      
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 text-center">
          <Label htmlFor="investment-amount" className="text-white mb-2 block">
            Investment Amount ($)
          </Label>
          <Input
            id="investment-amount"
            type="text"
            value={investment}
            onChange={handleChange}
            placeholder="Enter amount (e.g. 1000)"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center"
          />
        </div>
        
        <div className="w-full md:w-1/2 text-center mt-6">
          <p className="text-white/60 text-sm mb-1">At $0.40 per share:</p>
          <p className="text-3xl font-bold text-gradient-metallic text-center">
            {numberOfShares.toLocaleString()} shares
          </p>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-white/60 text-center">
        Share price is fixed at $0.40 per share for this funding round.
      </p>
    </div>
  );
};

export default InvestmentCalculator;
