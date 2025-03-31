
import React, {useState} from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { supabase } from '@/integrations/supabase/client';

interface InvestmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsOpen: (open: boolean) => void;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  isOpen,
  onOpenChange,
  setIsOpen,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Investment data states
  const [interestedAmount, setInterestedAmount] = useState(0); // Will be loaded from DB
  
  const handleSubmitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(investmentAmount);
    
    if (amount < 1000) {
      toast({
        title: "Minimum investment required",
        description: "Please enter a minimum investment of $1,000",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('investment_interests')
        .insert({
          email: email,
          investment_amount: amount
        });

      if (error) {
        console.error('Error saving investment interest:', error);
        throw error;
      }

      // Update the local state to include the new investment amount
      setInterestedAmount(prevAmount => prevAmount + amount);

      toast({
        title: "Interest registered",
        description: `Thank you for your interest in investing $${amount.toLocaleString()}!`,
        variant: "default"
      });
      
      setIsOpen(false);
      setInvestmentAmount('');
      setEmail('');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't save your interest. Please try again later.",
        variant: "destructive"
      });
      console.error('Error in submit handler:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsSubmitting}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-black/80 border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center mb-2 text-gradient-metallic">Express Your Interest</DialogTitle>
          <DialogDescription className="text-white/70 text-center">
            Let us know how much you're interested in investing in TableOne's future.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmitInterest} className="space-y-4 py-4">
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
