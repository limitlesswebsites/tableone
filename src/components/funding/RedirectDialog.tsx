
import React from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../ui/alert-dialog';
import { Loader } from 'lucide-react';

interface RedirectDialogProps {
  isOpen: boolean;
}

const RedirectDialog: React.FC<RedirectDialogProps> = ({ isOpen }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="backdrop-blur-xl bg-black/80 border border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-center mb-2 text-gradient-metallic">Redirecting to Wefunder</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70 text-center">
            You are being redirected to our Wefunder page...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center my-6">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RedirectDialog;
