
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';

interface InvestmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  investmentAmount: string;
  setInvestmentAmount: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  isOpen,
  onOpenChange,
  investmentAmount,
  setInvestmentAmount,
  email,
  setEmail,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-black/80 border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center mb-2 gradient-heading">Express Your Interest</DialogTitle>
          <DialogDescription className="text-white/70 text-center">
            Let us know how much you're interested in investing in TableOne's future.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="investment-amount" className="text-sm font-medium text-white/80">
              Investment Amount ($)
            </label>
            <Input
              id="investment-amount"
              type="number"
              min="1000"
              step="1000"
              placeholder="Minimum $1,000"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-4 flex justify-center">
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
            >
              Register Interest
            </Button>
          </div>
          
          <p className="text-xs text-white/50 text-center">
            This is a non-binding expression of interest. We'll contact you with more details.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDialog;
