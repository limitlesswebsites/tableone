
import React, {useState, useEffect} from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '../ui/alert-dialog';

import { supabase } from '@/integrations/supabase/client';

interface InvestmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsOpen: (open: boolean) => void;
}

const INVESTMENT_COOKIE_NAME = "tableone_investment_submitted";

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  isOpen,
  onOpenChange,
  setIsOpen,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Investment data states
  const [interestedAmount, setInterestedAmount] = useState(0); // Will be loaded from DB
  
  // Check for existing cookie when component mounts
  useEffect(() => {
    const hasSubmittedBefore = document.cookie
      .split('; ')
      .some(row => row.startsWith(`${INVESTMENT_COOKIE_NAME}=`));
      
    if (hasSubmittedBefore) {
      // If cookie exists, user has already submitted interest
      console.log("Investment cookie found, user has previously submitted interest");
    }
  }, []);
  
  // Fetch the IP address when the component mounts
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        // Continue without IP if we can't get it
      }
    };
    
    fetchIpAddress();
  }, []);
  
  // Helper function to set the investment cookie
  const setInvestmentCookie = () => {
    // Set cookie to expire in 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    // Set secure cookie with 1 year expiry
    document.cookie = `${INVESTMENT_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  };
  
  const handleSubmitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(investmentAmount);
    
    if (amount < 500) {
      toast({
        title: "Minimum investment required",
        description: "Please enter a minimum investment of $500",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if this user has already submitted interest via cookie
      const hasSubmittedBefore = document.cookie
        .split('; ')
        .some(row => row.startsWith(`${INVESTMENT_COOKIE_NAME}=`));
        
      // Check if this IP address has already submitted an interest
      let ipHasSubmitted = false;
      if (ipAddress) {
        const { data: existingInterests, error: lookupError } = await supabase
          .from('investment_interests')
          .select('id')
          .eq('ip_address', ipAddress);
          
        if (lookupError) {
          console.error('Error checking existing submissions:', lookupError);
          throw lookupError;
        }
        
        ipHasSubmitted = existingInterests && existingInterests.length > 0;
      }
      
      // If user has already submitted (via cookie or IP), pretend to submit but don't actually store in DB
      if (hasSubmittedBefore || ipHasSubmitted) {
        console.log("User already submitted interest previously, simulating submission");
        
        // Wait a moment to simulate the submission process
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Proceed as if the submission was successful
        setIsOpen(false);
        setInvestmentAmount('');
        setEmail('');
        
        // Navigate to success page just like a normal submission
        navigate('/investment-success');
        
        setIsSubmitting(false);
        return;
      }

      // This is a new submission, proceed with storing in the database
      const { error } = await supabase
        .from('investment_interests')
        .insert({
          email: email,
          investment_amount: amount,
          ip_address: ipAddress  // Add the IP address to the database entry
        });

      if (error) {
        console.error('Error saving investment interest:', error);
        throw error;
      }

      // Set the cookie after successful submission
      setInvestmentCookie();

      // Update the local state to include the new investment amount
      setInterestedAmount(prevAmount => prevAmount + amount);
      
      setIsOpen(false);
      setInvestmentAmount('');
      setEmail('');
      
      // Navigate to success page instead of showing toast
      navigate('/investment-success');
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
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                min="500"
                // step="1000"
                placeholder="Minimum $500"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Register Interest'}
              </Button>
            </div>
            
            <p className="text-xs text-white/50 text-center">
              This is a non-binding expression of interest. We'll contact you with more details.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="backdrop-blur-xl bg-black/80 border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center mb-2 text-gradient-metallic">We've Got You!</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70 text-center">
              We've already received your interest, and we'll reach out shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mt-6">
            <AlertDialogAction 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg"
              onClick={() => {
                setAlertOpen(false);
                setIsOpen(false);
              }}
            >
              Got it
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </Dialog>
    </>
  );
};

export default InvestmentDialog;
